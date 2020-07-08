import './layout.css';
import img from '../../Assets/logo-desktop.svg';

import React from "react";

const Footer = () => {
  return <div>  
  <footer className="footer">
    <div className="container">
      <img src={img} alt="Logo" height="20px"/>
      &copy; NEDians' Forum, {new Date().getFullYear()}
    </div>
  </footer>; 
</div>
};

export default Footer;
