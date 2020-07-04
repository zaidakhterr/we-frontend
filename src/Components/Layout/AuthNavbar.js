import './layout.css';

import React from "react";
import { Link } from "react-router-dom";

import img from '../../Assets/logo-mobile.svg';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
  
const { SubMenu } = Menu;

const NavbarMobile = () => {
  return <div>  
    <Menu mode="horizontal">
        <Menu.Item className="menu">
            <img src={img} alt="Logo" width="90px" height="20px"/>
        </Menu.Item>
        <SubMenu icon={<UserOutlined />} >
            <Menu.Item><Link to="/profile">Profile</Link></Menu.Item>
            <Menu.Item>Sign Out</Menu.Item>
        </SubMenu>
    </Menu>
    <footer className="footer">
    <div className="container">
        <img src={img} alt="Logo" height="20px"/>
        &copy; NEDians' Forum, {new Date().getFullYear()}
    </div>
    </footer>;

</div>
};

export default NavbarMobile;
