import "./layout.css";
import img from "../../Assets/logo-desktop.svg";

import React from "react";
import { Row, Col } from "antd";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <Row justify="space-between" align="middle">
            <Col>
              <img src={img} alt="Logo" height="25px" />
            </Col>
            <Col>
              <div>&copy; NEDians' Forum, {new Date().getFullYear()}</div>
            </Col>
          </Row>
        </div>
      </footer>
      ;
    </div>
  );
};

export default Footer;
