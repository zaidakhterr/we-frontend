import './layout.css';
import Footer from './Footer';

import React from "react";
import { Link } from "react-router-dom";

import img from '../../Assets/logo-mobile.svg';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
  
const NavbarMobile = () => {
  return <div>  
<nav className="zone sticky">
    <ul className="main-nav">
        <li><img src={img} alt="Logo" width="90px" height="20px"/></li>
        <li className="push"><Button icon={<MenuOutlined />} className="dropdown">
            <div className="dropdown-content">
            <Link to="/profile">Profile</Link>
            <li>Sign Out</li>
        </div></Button></li>
    </ul>
</nav>
<Footer />
</div>
};

export default NavbarMobile;
