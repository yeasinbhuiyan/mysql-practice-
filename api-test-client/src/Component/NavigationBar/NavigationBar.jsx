import { Link, NavLink, useNavigate } from 'react-router-dom';
import './NavigationBar.css'


const NavigationBar = () => {
    const user = localStorage.getItem('user')
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem('user')
        navigate('/login')
   }
 
    return (
        <div className='navbar'>
            <ul>
                <li>
                    <NavLink className={({ isActive }) => isActive ?  'text-warn' : ''} to={'/'}>Home</NavLink>
                </li>

                <li>
                    <NavLink className={({ isActive }) => isActive ?  'text-warn' : ''} to={'/employ-details'}>App</NavLink>
                </li>

                <li>
                    <NavLink className={({ isActive }) => isActive ?  'text-warn' : ''} to={'/blog'}>Blog</NavLink>
                </li>

                <li>

                    <NavLink className={({ isActive }) => isActive ?  'text-warn' : ''} to={'/about'}>About</NavLink>

                </li>

                <li>
                    {
                        user ? <button onClick={handleLogOut} className='logout-btn'>Logout</button> : <Link to={'/login'}>   <button className='login-btn'>Login</button></Link>
                    }

                </li>
            </ul>
        </div>
    );
};

export default NavigationBar;