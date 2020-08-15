import "./layout.css";

import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Menu, Dropdown, Avatar } from "antd";
import { useMediaQuery } from "react-responsive";

import img from "../../Assets/logo-mobile.svg";
import img_desktop from "../../Assets/logo-desktop.svg";
import useAuth from "../../Hooks/useAuth";
import { Search, SearchMobile } from "../Search/Search";

const AuthNavbar = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const { auth, setAuth } = useAuth();

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/" onMouseDown={() => setAuth(null)}>
          Sign Out
        </Link>
      </Menu.Item>
    </Menu>
  );

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
          <Row gutter={16}>
            {isMobile ? (
              <Col>
                <SearchMobile />
              </Col>
            ) : (
              <Col>
                <Search />
              </Col>
            )}
            <Col>
              <Dropdown overlay={menu} placement="bottomRight" arrow>
                {auth.result.user.image !== null ? (
                  <Avatar src={auth.result.user.image} />
                ) : (
                  <Avatar
                    style={{
                      backgroundColor: "#ed9327",
                      userSelect: "none",
                      textTransform: "uppercase",
                    }}
                  >
                    {`${auth.result.user.fullname.split("")[0]}`}
                  </Avatar>
                )}
              </Dropdown>
            </Col>
          </Row>
        </Row>
      </div>
    </header>
  );
};

export default AuthNavbar;
