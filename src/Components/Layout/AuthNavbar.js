import './layout.css';
import img from '../../Assets/logo-mobile.svg';

import React from "react";
import { Link } from "react-router-dom";

import { Row, Col, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const menu = (
    <Menu>
    <Menu.Item><Link to="/profile">Profile</Link></Menu.Item>
    <Menu.Item>Sign Out</Menu.Item>
  </Menu>
);

const NavbarMobile = () => {
  return <div className="nav-container">  
  <Row type="flex" justify="space-between">
    <Col><img src={img} alt="Logo" width="90px" height="20px"/></Col>
    <Col><Dropdown overlay={menu}><Avatar style={{ backgroundColor: '#ed9327' }} icon={<UserOutlined />} /></Dropdown></Col>
  </Row>
</div>
};

export default NavbarMobile;
