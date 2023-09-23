import React, { useEffect, useState } from 'react';
import MyAxios from "axios";
const SalaryTab = () => {

    const [salary , setSalary] = useState([])

// axios method
//     async function getData() {
//       let response = await MyAxios.get(`http://localhost:4030/salary`)
//       console.log(response);
//       setSalary(response.data || [])
//     }
//       useEffect(()=>{
//         console.log(11);
//         getData()
//       },[])

    useEffect(()=>{

        fetch('http://localhost:4030/salary', {
            method: 'GET'
          })
            .then(res => res.json()) 
            .then(data => {
                setSalary(data)
    
               
            })
    },[])




    
const handleSalaryForm =(e)=>{
    e.preventDefault()
  
    const form = e.target 
    const name = form.name.value
    const salary_grad = form.salary_grad.value
    const salary = form.salary.value
    const country = form.country.value
  
    const fdata = {
      name,
      salary_grad,
      salary,
      country
    }
  
    fetch('http://localhost:4030/add-salary',{
      method : 'POST',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify(fdata)
    })
  }

const handleDelete =(id)=>{
  fetch(`http://localhost:4030/delete-salary/${id}`,{
    method : 'DELETE',
    headers : {
      'content-type' : 'application/json'
    }
  })
  .then(response => {
    console.log(response)
    // if(response.ok){
    //   setTrigger(trigger)
    // }
  })
  .catch(error =>{
    console.log(error)
  })
}

    return (
        <div className='emy_details'>
        <div className='form_wrapper'>

          <form onSubmit={handleSalaryForm}>

            <div className='common'>
              <label htmlFor="">Name</label>
              <input placeholder='Name' name='name' type="text" />
            </div>


            <div className='common'>
              <label htmlFor="">Grad</label>
              <input placeholder='Grad' name='salary_grad' type="number" />
            </div>


            <div className='common'>
              <label htmlFor="">Salary</label>
              <input placeholder='Salary' name='salary' type="number" />
            </div>


            <div className='common'>
              <label htmlFor="">Country</label>
              <input placeholder='Country' name='country' type="text" />
            </div>


            <div className='submit-btn'>
              <button type='submit'>Submit</button>
            </div>
          </form>

        </div>

        <div className='table_wrapper'>

          <table>

            <thead>
              <tr>
                <th>SL.</th>
                <th>Name</th>
                <th>Grad</th>
                <th>Salary</th>
                <th>Country</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {
                salary?.map(slr => {
                  return <React.Fragment  key={slr.Id}>
                    <tr>
                    <td>{slr.id}</td>
                    <td>{slr.name}</td>
                    <td>{slr.salary}</td>
                    <td>{slr.country}</td>
                    <td><button onClick={()=> handleDelete (slr.id)} type='button'>Delete</button></td>
                  </tr>
                  </React.Fragment>
                })
              }
            </tbody>

          </table>

        </div>

      </div>
    );
};

export default SalaryTab;