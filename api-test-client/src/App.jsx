
import React, { useEffect, useState } from 'react'
import './App.css'
import EditPopup from './Component/EditPopup'
import { userDetails } from './common'
// import SalaryTab from './Component/SalaryTab'

function App() {

  const [employ, setEmploy] = useState([])
  const [trigger, setTrigger] = useState()
  const [singleData, setSingleData] = useState([])
  const [editToggle, setEditToggle] = useState()


  // get oparation  

  //  const userData = userDetails()
  //  console.log(userData)



  useEffect(() => {
    console.log('called');
    fetch('http://localhost:4040/all-emp', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        setEmploy(data)
        console.log('gettt')
      })
  }, [trigger])



  const handleEdit = (id) => {
    setEditToggle('ok')
    document.body.style.overflow = 'hidden'


    fetch(`http://localhost:4040/employ/${id}`)
      .then(res => res.json())
      .then(data => {

        data.forEach(df => {
          setSingleData(df)

        }
        )

      })

  }


  const handleForm = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const position = form.position.value
    const grad = form.grad.value
    const salary = form.salary.value
    const city = form.city.value

    console.log(name, position, grad, salary, city)

    const mdata = {
      name,
      position,
      grad,
      salary,
      city
    }


    fetch('http://localhost:4040/add-emp', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(mdata)

    })
      .then(response => {
        console.log(response)
        if (response.ok) {
          setTrigger([])
          form.reset()
          alert('your data inserted')
        }
      })
      .catch(err => {
        console.log(err)

      })
  }


  const handleDelete = (id) => {
    fetch(`http://localhost:4040/delete-officer/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => {

        if (response.ok) {
          setTrigger([])
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleAsc = () => {
    fetch('http://localhost:4040/asc-dsc/1')
      .then(res => res.json())
      .then(data => {
        setEmploy(data[0])

      })
  }


  const handleDsc = () => {
    fetch('http://localhost:4040/asc-dsc/2')
      .then(res => res.json())
      .then(data => {
        setEmploy(data[0])
      })
  }



  const handleSalaryRange = (value) => {
    if (value) {
      fetch(`http://localhost:4040/salary-range/${value}`)
        .then(res => res.json())
        .then(data => {
          console.log(data[0])
          setEmploy(data[0])
        })
    }
    else {
      fetch('http://localhost:4040/all-emp')
        .then(res => res.json())
        .then(data => {
          setEmploy(data)

        })
    }
  }


  const handleDscAsc = (number) => {

    if (number === 1) {
      const tempData = employ.sort((a, b) => {
        return a.salary - b.salary;
      });
      setEmploy(tempData)
      setTrigger('asc')

    } else {
      const tempData = employ.sort((a, b) => {
        return b.salary - a.salary;
      });

      setEmploy(tempData)
      setTrigger('dsc')
    }
  }



  return (
    <>
      <div>
        {
          editToggle
            ? <EditPopup
              editToggle
              ={editToggle
              } setEditToggle={setEditToggle} singleData={singleData} setTrigger={setTrigger} /> : ''

        }
        <h2 className='head_line'>Company Employ Details</h2>
        <div className='emy_details'>

          <div className='form_wrapper'>

            <form onSubmit={handleForm}>

              <div className='common'>
                <label htmlFor="">Name</label>
                <input placeholder='Name' name='name' type="text" required />
              </div>


              <div className='common'>
                <label htmlFor="">Position</label>
                <input placeholder='Position' name='position' type="text" required />
              </div>


              <div className='common'>
                <label htmlFor="">Grad</label>
                <input placeholder='Grad' name='grad' type="text" required />
              </div>


              <div className='common'>
                <label htmlFor="">Salary</label>
                <input placeholder='Salary' name='salary' type="text" required />
              </div>
              <div className='common'>
                <label htmlFor="">City</label>
                <input placeholder='City' name='city' type="text" required />
              </div>


              <div className='submit-btn'>
                <button type='submit'>Submit</button>
              </div>
            </form>

          </div>

          <div className='table_wrapper'>
            <div className='client-side-asc'>

              <h1>From Server Side</h1>
              <div className='asc-dsc-btns'>
                <button onClick={handleAsc}>ASC</button>
                <button onClick={handleDsc}>DSC</button>

              </div>



              {/* <div className='client-side-asc'>
              <h1>From Client Side</h1>
              <div className='asc-dsc-btns'>
                <button onClick={() => handleDscAsc(1)}>ASC</button>
                <button onClick={() => handleDscAsc(2)}>DSC</button>

              </div> */}
            </div>

            <div className='salary-range'>

              <input type="number" placeholder='Upto salary' onChange={(e) => handleSalaryRange(e.target.value)} />

            </div>

            <table>

              <thead>
                <tr>
                  <th>SL.</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Grad</th>
                  <th>Salary</th>
                  <th>City</th>
                </tr>
              </thead>

              <tbody>

                {
                  employ.map((emp, index) => {
                    return <tr key={index}>
                      <td>{emp.id}</td>
                      <td>{emp.name}</td>
                      <td>{emp.grad}</td>
                      <td>{emp.salary}</td>
                      <td>{emp.city}</td>
                      <td className='app-submit-btn'><button type='button' onClick={() => handleDelete(emp.id)}>Delete</button>
                        <button type='button' onClick={() => handleEdit(emp.id)}>Edit</button></td>
                    </tr>

                  })
                }
              </tbody>

            </table>

          </div>
        </div>






        {/* 
      <h2 className='head_line2'>Company Salary Sheet</h2>

       <SalaryTab/> */}

      </div>
    </>
  )
}

export default App
