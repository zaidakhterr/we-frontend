import "./layout.css";
import img from "../../Assets/logo-mobile.svg";

import React from "react";
import { Link } from "react-router-dom";

import { MenuOutlined } from "@ant-design/icons";
import { Row, Col, Menu, Dropdown, Button } from "antd";

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/sign-in">Sign In</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/sign-up">Sign Up</Link>
    </Menu.Item>
  </Menu>
);

const NavbarMobile = () => {
  return (
    <header className="header">
      <div className="container">
        <Row type="flex" justify="space-between" align="middle">
          <Col>
            <Link to="/">
              <img src={img} alt="Logo" height="25px" />
            </Link>
          </Col>
          <Col>
            <Dropdown overlay={menu} placement="bottomRight" arrow>
              <Button icon={<MenuOutlined style={{ color: "#ed9327" }} />} />
            </Dropdown>
          </Col>
        </Row>
      </div>
    </header>
  );
};

export default NavbarMobile;
