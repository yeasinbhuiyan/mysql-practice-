import { Link, NavLink, useNavigate } from 'react-router-dom';
import './NavigationBar.css'
import axios from "axios";
import { userDetails } from '../../common';
import { useEffect, useState } from 'react';

const NavigationBar = () => {

    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }


    async function getData() {
        const muser = await userDetails()
        setUser(muser?.data);
        console.log(muser?.data)
    }

    useEffect(() => {
        getData()
    }, [])


    // axios(`http://localhost:4040/get-user/${}`)
    // .then(response =>{
    //     console.log(response)
    // } )



    return (
        <div className='navbar'>
            <ul>
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'text-warn' : ''} to={'/'}>Home</NavLink>
                </li>

                <li>
                    <NavLink className={({ isActive }) => isActive ? 'text-warn' : ''} to={'/employ-details'}>App</NavLink>
                </li>

                <li>
                    <NavLink className={({ isActive }) => isActive ? 'text-warn' : ''} to={'/blog'}>Blog</NavLink>
                </li>

                <li>

                    <NavLink className={({ isActive }) => isActive ? 'text-warn' : ''} to={'/about'}>About</NavLink>

                </li>

                <li>
                    {
                        user ? <button onClick={handleLogOut} className='logout-btn'>Logout</button> : <Link to={'/login'}>   <button className='login-btn'>Login</button></Link>
                    }

                </li>
                <li className='avater'>
                    {
                        user?.profile && <img title={user?.username} src={`http://localhost:4040/public/Images/profile/${user?.profile}`} alt="" />

                    }
                </li>

            </ul>
        </div>
    );
};

export default NavigationBar;