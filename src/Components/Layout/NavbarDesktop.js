import './layout.css';

import React from "react";
import { Link } from "react-router-dom";

import img from '../../Assets/logo-desktop.svg';

import { Button, Tooltip, Menu } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const NavbarDesktop = () => {
  return <div>  
  <Menu mode="horizontal">
    <Menu.Item className="menu">
      <img src={img} alt="Logo" width="200px" height="20px"/>
    </Menu.Item>
      <Menu.Item>  
        <Tooltip title="Search">
          <Button type="primary" shape="circle" icon={<SearchOutlined />}/>
        </Tooltip>
      </Menu.Item>
      <Menu.Item>
        <Link to="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </Menu.Item>
      <Menu.Item> 
        <Link to="/sign-up"> 
          <Button type="primary">Sign Up</Button>
        </Link>
      </Menu.Item> 
  </Menu>
  <footer className="footer">
    <div className="container">
      <img src={img} alt="Logo" height="20px"/>
      &copy; NEDians' Forum, {new Date().getFullYear()}
    </div>
  </footer>; 
</div>
};

export default NavbarDesktop;
