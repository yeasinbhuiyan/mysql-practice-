import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
const Login = () => {
    const { setTrigger } = useContext(AuthContext)
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

        axios.post('http://localhost:4040/match-login', loginDetails)
            .then(loginRes => {
                console.log(loginRes)

                if (loginRes?.data[0]) {
                    alert('successfully loging')
                    setTrigger('reload')

                    localStorage.setItem('user', JSON.stringify(loginRes?.data[0]))
                    navigate(nfrom)
                    // window.location.reload(false)
                }
                else {
                    alert('something is wrong')
                    // localStorage.removeItem('user')
                }
            })


    }



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