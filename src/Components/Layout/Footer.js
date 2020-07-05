import './layout.css';

import React from "react";

import img from '../../Assets/logo-desktop.svg';

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
