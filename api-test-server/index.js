const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise')
const multer = require('multer')
const path = require('path');

const port = process.env.PORT || 4040

const app = express()


// middlewear 
app.use(cors())
app.use(express.json())

const db = {
    host: 'localhost',
    user: "yeasin",
    password: "123456",
    database: "imp-exp",
    connectionLimit: 10
}

// app.use(express.static(__dirname+"./public"));

// app.use('/public', express.static('public'));

app.use('/static', express.static(path.join(__dirname, './public')))



const pool = mysql.createPool(db)


app.get('/', (req, res) => {
    res.send('server is running')
})

app.get('/all-emp', async (req, res) => {
    const connection = await pool.getConnection()

    const [rows] = await connection.query(`SELECT * FROM officer`)
    res.send(rows)

    connection.release()
})

app.get('/employ/:id', async (req, res) => {
    const connection = await pool.getConnection()
    const id = req.params.id
    const [rows] = await connection.query(`SELECT * FROM officer where id =${id}`)
    res.send(rows)

    connection.release()

})


app.post('/add-emp', async (req, res) => {
    const connection = await pool.getConnection()
    const emp_details = req.body
    const query = `INSERT INTO officer (name , position  , grad , salary , city) VALUES (?,?,?,?,?)`

    const details = [
        emp_details.name,
        emp_details.position,
        emp_details.grad,
        emp_details.salary,
        emp_details.city,
    ]

    const response = await connection.query(query, details, function (err, mresult) {
        if (err) throw err;
    })
    res.send(response)
})




//start profile picture image  


// multer middle wear 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/Images/Profile")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})



const upload = multer({
    storage, limits: {
        fileSize: 1024 * 1024 * 5, // 5MB (adjust as needed)
    },
})




app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file.filename, 'profile body')
    res.send(req.file)
})


//end profile picture image  

app.post('/create-user', async (req, res) => {
    const connection = await pool.getConnection()
    const { username, password, email, profile } = req.body;
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const query = 'INSERT IGNORE INTO users (username, password_hash , email,profile) VALUES (?, ?, ?,?)';

    const userDetails = [
        username,
        hashedPassword,
        email,
        profile
    ]

    const response = await connection.query(query, userDetails, (error, results) => {
        if (error) {
            res.status(500).send({ error: 'Internal server error' });
        } else {
            res.status(200).send({ message: 'User registered successfully' });
        }

    });

    res.send(response)
    connection.release()
})

app.post('/get-email', async (req, res) => {
    const connection = await pool.getConnection()
    const {email} = req.body 
    const [rows] = await connection.query(`SELECT email FROM users WHERE email = '${email}' `)
  

    if(!rows[0]?.email){
        res.send({error: false})
    }else{
       
        res.send({error : true , message : 'This Email Already added'})
    }
    
})

// 1st way  

// app.post('/match-login', async (req, res) => {
//     const connection = await pool.getConnection()
//     const { email, password } = req.body

//     const query = `SELECT password_hash from users where email ='${email}'`

//     const response = await connection.query(query, [email], async (error, results) => {


//         if (error) {
//             console.error('Error retrieving user data:', error);
//             res.status(500).json({ error: 'Internal server error' });
//         } else if (results.length === 0) {
//             console.log('User not found')
//             res.status(401).json({ error: 'User not found' });
//         } else {
//             const hashedPassword = results[0].password_hash;
//             console.log(hashedPassword , 'hashedPassword')



//             // Compare the provided password with the stored hashed password
//             try {
//                 const passwordMatch = await bcrypt.compare(password, hashedPassword);
//                 console.log(passwordMatch ,'passwordMatch')
//                 if (passwordMatch) {
//                     res.status(200).json({ message: 'Login successful' });
//                 } else {
//                     res.status(401).json({ error: 'Incorrect password' });
//                 }


//             } catch (error) {
//                 console.error('Error comparing passwords:', error);
//                 res.status(500).json({ error: 'Internal server error' });
//             }



//         }
//     });
//     console.log(response , 'response')
//     res.send(response)
// })


// 2nd way  

// app.post('/match-login', async (req, res) => {
//     try {
//         const connection = await pool.getConnection();
//         const { email, password } = req.body;

//         const query = `SELECT password_hash from users where email ='${email}'`;
//         const [results] = await connection.query(query, [email]);
//         console.log(results)
//         if (results.length === 0) {
//             console.log('User not found');
//             res.status(401).json({ error: 'User not found' });
//         } else {
//             const hashedPassword = results[0].password_hash;
//             console.log(hashedPassword, 'hashedPassword');

//             // Compare the provided password with the stored hashed password
//             try {
//                 const passwordMatch = await bcrypt.compare(password, hashedPassword);
//                 console.log(passwordMatch, 'passwordMatch');
//                 if (passwordMatch) {
//                     res.status(200).json({ message: 'Login successful' });
//                 } else {
//                     res.status(401).json({ error: 'Incorrect password' });
//                 }
//             } catch (error) {
//                 console.error('Error comparing passwords:', error);
//                 res.status(500).json({ error: 'Internal server error' });
//             }
//         }

//         // Release the database connection
//         connection.release();
//     } catch (error) {
//         console.error('Error retrieving user data:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });



app.post('/match-login', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { email, password } = req.body;

        const query = `SELECT * from users where email ='${email}'`;

        const [results] = await connection.query(query, [email]);



        if (results.length === 0) {
            res.status(401).json({ error: 'User not found' });
        } else {
            const hashedPassword = results[0].password_hash;
            // Compare the provided password with the stored hashed password

            try {
                const passwordMatch = await bcrypt.compare(password, hashedPassword);
                if (passwordMatch) {
                    // res.status(200).json({ message: 'Login successful' });
                    res.send(results)
                    console.log(results[0])

                } else {
                    res.status(401).json({ error: 'Incorrect password' });
                }
            } catch (error) {
                console.error('Error comparing passwords:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }

        // Release the database connection
        connection.release();
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/match-user', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { email, password } = req.body;


        const query = `SELECT * from users where email ='${email}'`;

        const [results] = await connection.query(query, [email]);
        const databasePass = results[0].password_hash
        const storagePass = password

        if (databasePass === storagePass) {
            res.send({ user: true })
        }
        else {
            res.send({ user: false })
        }

        connection.release();

    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// app.put('/update-data/:id', async (req, res) => {
//     const connection = await pool.getConnection()

//     const id = req.params.id
//     const emp_details = req.body

//     const response = await connection.query(`UPDATE officer SET 
//     name = '${emp_details.name}',
//     position = '${emp_details.position}',
//     grad = '${emp_details.grad}',
//     salary = '${emp_details.salary}',
//     city = '${emp_details.city}',

//     WHERE id = ${id}`)

//     res.send(response)
//     connection.release()
// })


app.put('/update-data/:id', async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    const connection = await pool.getConnection()

    const sql = `
      UPDATE officer
      SET
        name = ?,
        position = ?,
        grad = ?,
        salary = ?,
        city = ?
      WHERE id = ?
    `;

    const response = await connection.query(sql, [
        updateData.name,
        updateData.position,
        updateData.grad,
        updateData.salary,
        updateData.city,
        id
    ], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        return res.status(200).json({ message: 'Data updated successfully' });
    });

    res.send(response)
    console.log(response)
});


app.delete('/delete-officer/:id', async (req, res) => {
    const id = req.params.id

    const connection = await pool.getConnection()
    const response = await connection.query(`DELETE FROM officer where id = ${id}`)
    res.send(response)
    connection.release()
})

app.get('/asc-dsc/:id', async (req, res) => {
    const connection = await pool.getConnection()

    const id = req.params.id

    if (id == 2) {
        const response = await connection.query(`SELECT * FROM officer ORDER BY salary DESC`)
        res.send(response)
    }
    else {
        const response = await connection.query(`SELECT * FROM officer ORDER BY salary`)
        res.send(response)
    }

    connection.release()
})


app.get('/salary-range/:salary', async (req, res) => {

    const connection = await pool.getConnection()
    const response = await connection.query(`SELECT * FROM officer where salary <= '${req.params.salary}'`)
    res.send(response)
    // console.log(response)
    connection.release()
})



app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})