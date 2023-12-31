import React, { useEffect } from 'react';
import NavigationBar from './Component/NavigationBar/NavigationBar';
import { Outlet } from 'react-router-dom';


const Layout = () => {
    return (
        <div>
            <NavigationBar/> 
            <Outlet/> 
        </div>
    );
};

export default Layout;