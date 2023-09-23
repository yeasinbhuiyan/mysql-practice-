import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const nfrom = location?.state?.from || '/'

    const handleLogin = (e) => {


        e.preventDefault()
        

        const form = e.target
        const email = form.email.value
        const password = form.password.value

        const loginDetails = {
            email,
            password
        }

        

        fetch('http://localhost:4040/match-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginDetails)
        })
           .then(res=> res.json())
           .then(dataa => {
            console.log(dataa[0])
            if(dataa[0]){
                alert('successfully loging')
                localStorage.setItem('user' , JSON.stringify(dataa[0]))
                navigate(nfrom)
            }
            else{
                alert('something is wrong')
                localStorage.removeItem('user')
            }
           })

        
    }


    // .then(response => {
    //     console.log(response)
    //     if (response.ok) {
    //         alert('Successfully Logging')
    //         navigate(nfrom)
    //         localStorage.setItem('user' , JSON.stringify(loginDetails))
    //     }
    //     else{
    //         alert('This is not Valid email or Password')
    //     }
    // })
    // .then(err => {
    //     console.log(err)
    // })


    return (
        <div className="login">
            <form onSubmit={handleLogin}>

                <div className="common">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" />
                </div>

                <div className="common">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" />
                </div>
                <p><Link to={'/register'}>Dont Have Account </Link></p>

                <div className="submit-btn">
                    <button>Submit</button>
                </div>
            </form>


        </div>
    );
};

export default Login;