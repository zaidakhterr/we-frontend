import "./layout.css";

import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Menu, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

import img from "../../Assets/logo-mobile.svg";
import img_desktop from "../../Assets/logo-desktop.svg";

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/profile">Profile</Link>
    </Menu.Item>
    <Menu.Item>Sign Out</Menu.Item>
  </Menu>
);

const AuthNavbar = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  return (
    <header className="header">
      <div className="container">
        <Row type="flex" justify="space-between" align="middle">
          <Col>
            <Link to="/">
              {isMobile ? (
                <img src={img} alt="Logo" height="25px" />
              ) : (
                <img src={img_desktop} alt="Logo" height="20px" />
              )}
            </Link>
          </Col>
          <Col>
            <Dropdown overlay={menu} placement="bottomRight" arrow>
              <Avatar
                style={{ backgroundColor: "#ed9327" }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </Col>
        </Row>
      </div>
    </header>
  );
};

export default AuthNavbar;
