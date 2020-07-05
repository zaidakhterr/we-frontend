import './layout.css';

import React from "react";
import { Link } from "react-router-dom";

import img from '../../Assets/logo-desktop.svg';

import { Button } from 'antd';
import Footer from './Footer';

const NavbarDesktop = () => {
  return <div>  
  <nav className="zone sticky">
    <ul className="main-nav">
      <li><img src={img} alt="Logo" width="200px" height="20px"/></li>
      <li className="push"><Link to="/sign-in"><Button>Sign In</Button></Link></li>
      <li><Link to="/sign-up"><Button type="primary">Sign Up</Button></Link></li>
    </ul>
  </nav>
  <Footer />
</div>
};

export default NavbarDesktop;
