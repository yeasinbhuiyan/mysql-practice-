import { Link, NavLink, useNavigate } from 'react-router-dom';
import './NavigationBar.css'
import axios from "axios";
import { userDetails } from '../../common';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const NavigationBar = () => {
    // const [user, setUser] = useState()
    // const storageUser = JSON.parse(localStorage.getItem('user'))
    const {user , setUser , loading , setLoading} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem('user')
        setUser()
        navigate('/login')
    }


    
    console.log(user)



    // 1st way this is made by himon vhai 
    // async function getData() {
    //     const muser = await userDetails()
    //     setUser(muser?.data);
    //     console.log(muser?.data)
    // }

    // useEffect(() => {
    //     getData()
    // }, [])








    // 2nd way this is made by me 
    // useEffect(() => {
    //     axios.get(`http://localhost:4040/get-user/${storageUser?.email}`)
    //         .then(isValid => {
    //             // console.log(isValid)
    //             if (isValid?.data) {
    //                 setUser(isValid?.data)
    //             } else {
    //                 localStorage.removeItem('user') 
    //                 navigate('/login')
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }, [])

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
                        user ?
                         <button onClick={handleLogOut} className='logout-btn'>Logout</button> 
                         :
                          <Link to={'/login'}>   <button className='login-btn'>Login</button></Link>
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