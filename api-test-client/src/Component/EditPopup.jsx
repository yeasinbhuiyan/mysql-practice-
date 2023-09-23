import './editPopup.css'

const editPopup = ({ editToggle, setEditToggle, singleData ,setTrigger}) => {


    const handleedit = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const position = form.position.value
        const grad = form.grad.value
        const salary = form.salary.value
        const city = form.city.value

        const id = singleData.id

        const updateData = {
            id,
            name,
            position,
            grad,
            salary,
            city
        }


        fetch(`http://localhost:4040/update-data/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData)
        })
            .then(response => {
                console.log(response)
                if(response.ok){
                    form.reset()
                    document.body.style.overflow = 'auto'
                    handleClose()
                    setTrigger('update')
                }
            })
            .catch(error => {
                console.log(error.message)
            })


    }

    
    const handleClose = () => {
        setEditToggle()
        document.body.style.overflow = 'auto'
    }

    return (
        <div className="edit_popup_wrapper">
            <div className='edit_form'>
                <form onSubmit={handleedit}>
                    <div className='common'>
                        <label htmlFor="">Name</label>
                        <input defaultValue={singleData.name} placeholder='Name' name='name' type="text" />
                    </div>

                    <div className='common'>
                        <label htmlFor="">Position</label>
                        <input defaultValue={singleData.position} placeholder='Position' name='position' type="text" />
                    </div>

                    <div className='common'>
                        <label htmlFor="">Grad</label>
                        <input defaultValue={singleData.grad} placeholder='Grad' name='grad' type="text" />
                    </div>

                    <div className='common'>
                        <label htmlFor="">Salary</label>
                        <input defaultValue={singleData.salary} placeholder='Salary' name='salary' type="text" />
                    </div>

                    <div className='common'>
                        <label htmlFor="">City</label>
                        <input defaultValue={singleData.city} placeholder='City' name='city' type="text" />
                    </div>


                    <div className='edit-submit-btn'>
                        <button type='submit'>Submit</button>
                        <button onClick={handleClose} type='button'>Close</button>
                    </div>

                </form>
            </div>

        </div>
    );
};

export default editPopup;