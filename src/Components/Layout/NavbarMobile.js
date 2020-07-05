import './layout.css';

import React from "react";
import { Link } from "react-router-dom";

import img from '../../Assets/logo-mobile.svg';
import Footer from './Footer';
import { MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const NavbarMobile = () => {
  return <div>  
  <nav className="zone sticky">
    <ul className="main-nav">
      <li><img src={img} alt="Logo" width="90px" height="20px"/></li>
      <li className="push"><Button icon={<MenuOutlined />} className="dropdown">
        <div className="dropdown-content">
          <Link to="/">Home</Link>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </div></Button></li>
    </ul>
  </nav>
  <Footer />
</div>
};

export default NavbarMobile;
