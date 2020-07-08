import './layout.css';
import img from '../../Assets/logo-desktop.svg';

import React from "react";
import { Link } from "react-router-dom";

import { Button, Row, Col } from 'antd';

const NavbarDesktop = () => {
  return <div className="nav-container">  
    <Row type="flex" justify="space-between">
      <Col><img src={img} alt="Logo" width="200px"/></Col>
      <Row gutter={16}>
        <Col><Link to="/sign-in"><Button>Sign In</Button></Link></Col>
        <Col><Link to="/sign-up"><Button type="primary">Sign Up</Button></Link></Col>
      </Row>
    </Row>
</div>
};

export default NavbarDesktop;
