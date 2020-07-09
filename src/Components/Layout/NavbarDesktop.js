import "./layout.css";

import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "antd";

import img from "../../Assets/logo-desktop.svg";

const NavbarDesktop = () => {
  return (
    <header className="header">
      <div className="container">
        <Row type="flex" justify="space-between" align="middle">
          <Col>
            <Link to="/">
              <img src={img} alt="Logo" height="25px" />
            </Link>
          </Col>
          <Row gutter={16}>
            <Col>
              <Link to="/sign-in">
                <Button>Sign In</Button>
              </Link>
            </Col>
            <Col>
              <Link to="/sign-up">
                <Button type="primary">Sign Up</Button>
              </Link>
            </Col>
          </Row>
        </Row>
      </div>
    </header>
  );
};

export default NavbarDesktop;
