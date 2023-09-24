import { Link, useNavigate } from 'react-router-dom';
import './Register.css'
import axios from 'axios';

const Register = () => {
 
    const navigate = useNavigate()
    const handleRegister = (e) => {
        e.preventDefault()
        const form = e.target

        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const profilePic = form.profile.files[0]


        const formData = new FormData();
        formData.append('file', profilePic);


        // const userDetails = {
        //     username: name,
        //     email,
        //     password,

        // }


        axios.post('http://localhost:4040/get-email', { email })

            .then(response => {
                console.log(response?.data)
                if (!response?.data?.error) {
                    console.log('This email is valid')
                    fetch('http://localhost:4040/upload', {
                        method: 'POST',
                        body: formData
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.filename) {
                                const userDetails = {
                                    username: name,
                                    email,
                                    password,
                                    profile: data?.filename
                                }

                                fetch('http://localhost:4040/create-user', {
                                    method: 'POST',
                                    headers: {
                                        'Content-type': 'application/json'
                                    },
                                    body: JSON.stringify(userDetails)
                                })
                                    .then(res => res.json())
                                    .then(data => {

                                        if (data[0].warningStatus > 0) {
                                            alert('This Email Already Added')
                                        } else {

                                            if (data[0].insertId > 0) {
                                                alert('Successfully Created Your Email')

                                                //  for start set localStorage data 
                                                fetch('http://localhost:4040/match-login', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify(userDetails)
                                                })
                                                    .then(res => res.json())
                                                    .then(dataa => {
                                                        console.log(dataa[0])
                                                        if (dataa[0]) {
                                                            alert('successfully loging')
                                                            localStorage.setItem('user', JSON.stringify(dataa[0]))
                                                        }
                                                        else {
                                                            alert('something is wrong')
                                                            localStorage.removeItem('user')
                                                        }
                                                    })
                                                // for end set localStorage data 

                                                navigate('/')
                                            }
                                            else {
                                                alert('Somthing is Happens Please try again')
                                            }

                                        }

                                    })
                            }
                            else {
                                alert('this is not valid image ')
                            }
                        })


                } else {
                    alert('this email already exists')
                }
            })





        // fetch('http://localhost:4040/get-email', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email })
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (!data?.error) {
        //             console.log('This email is valid')
        //             fetch('http://localhost:4040/upload', {
        //                 method: 'POST',
        //                 body: formData
        //             })
        //                 .then(res => res.json())
        //                 .then(data => {
        //                     if (data.filename) {
        //                         // const imageName = data?.filename
        //                         const userDetails = {
        //                             username: name,
        //                             email,
        //                             password,
        //                             profile: data?.filename
        //                         }

        //                         fetch('http://localhost:4040/create-user', {
        //                             method: 'POST',
        //                             headers: {
        //                                 'Content-type': 'application/json'
        //                             },
        //                             body: JSON.stringify(userDetails)
        //                         })
        //                             .then(res => res.json())
        //                             .then(data => {

        //                                 if (data[0].warningStatus > 0) {
        //                                     alert('This Email Already Added')
        //                                 } else {

        //                                     if (data[0].insertId > 0) {
        //                                         alert('Successfully Created Your Email')

        //                                         //  for start set localStorage data 
        //                                         fetch('http://localhost:4040/match-login', {
        //                                             method: 'POST',
        //                                             headers: {
        //                                                 'Content-Type': 'application/json'
        //                                             },
        //                                             body: JSON.stringify(userDetails)
        //                                         })
        //                                             .then(res => res.json())
        //                                             .then(dataa => {
        //                                                 console.log(dataa[0])
        //                                                 if (dataa[0]) {
        //                                                     alert('successfully loging')
        //                                                     localStorage.setItem('user', JSON.stringify(dataa[0]))
        //                                                 }
        //                                                 else {
        //                                                     alert('something is wrong')
        //                                                     localStorage.removeItem('user')
        //                                                 }
        //                                             })
        //                                         // for end set localStorage data 

        //                                         navigate('/')
        //                                     }
        //                                     else {
        //                                         alert('Somthing is Happens Please try again')
        //                                     }

        //                                 }

        //                             })
        //                     }
        //                     else {
        //                         alert('this is not valid image ')
        //                     }
        //                 })


        //         } else {
        //             alert('this email already exists')
        //         }
        //     })


    }



    return (
        <div className="register">
            <form onSubmit={handleRegister} encType="multipart/form-data" method='post'>

                <div className="common">
                    <label htmlFor="">Profile Picture</label>
                    <input
                        //  onChange={(e) => setProfilePic(e.target.files[0])}
                        type="file"
                        name="profile"
                        required
                    />
                </div>


                <div className="common">
                    <label htmlFor="">Name</label>
                    <input type="text" name="name" required />
                </div>

                <div className="common">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" required />
                </div>

                <div className="common">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" required />
                </div>
                <p><Link to={'/login'}>I Have Account</Link></p>

                <div className="register_submit_btn">
                    <button type='submit'>Submit</button>
                </div>
            </form>


        </div>
    );
};

export default Register;