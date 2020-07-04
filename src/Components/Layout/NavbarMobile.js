import './layout.css';

import React from "react";
import { Link } from "react-router-dom";

import img from '../../Assets/logo-mobile.svg';
import { Button, Tooltip, Menu } from 'antd';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const NavbarMobile = () => {
  return <div>  
  <Menu mode="horizontal">
    <Menu.Item className="menu">
      <img src={img} alt="Logo" width="90px" height="20px"/>
    </Menu.Item>
    <Menu.Item>
      <Tooltip title="Search">
        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
      </Tooltip>
    </Menu.Item>
    <SubMenu icon={<MenuOutlined />} >
      <Menu.Item><Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item><Link to="/sign-in">Sign In</Link></Menu.Item>
      <Menu.Item><Link to="/sign-up">Sign Up</Link></Menu.Item>
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
