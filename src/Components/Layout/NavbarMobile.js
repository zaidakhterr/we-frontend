import './layout.css';
import img from '../../Assets/logo-mobile.svg';

import React from "react";
import { Link } from "react-router-dom";

import { MenuOutlined } from '@ant-design/icons';
import { Row, Col, Menu, Dropdown } from 'antd';

const menu = (
  <Menu>
  <Menu.Item><Link to="/">Home</Link></Menu.Item>
  <Menu.Item><Link to="/sign-in">Sign In</Link></Menu.Item>
  <Menu.Item><Link to="/sign-up">Sign Up</Link></Menu.Item>
</Menu>
);

const NavbarMobile = () => {
  return <div className="nav-container">  
  <Row type="flex" justify="space-between">
    <Col><img src={img} alt="Logo" width="90px" height="20px"/></Col>
    <Col><Dropdown overlay={menu}><MenuOutlined style={{ color: '#ed9327' }}/></Dropdown></Col>
  </Row>
</div>
};

export default NavbarMobile;
