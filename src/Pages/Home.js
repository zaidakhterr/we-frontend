import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

import { Typography, Row, Col, Button } from "antd";
import QuestionList from "../Components/Home/QuestionList";

const { Title } = Typography;

const Home = () => {
  const { auth } = useAuth();
  return (
    <div className="home-page">
      <div className="container">
        <Row type="flex" justify="space-between" align="middle">
          <Col>
            <Title level={1}>Top Questions</Title>
          </Col>
          <Col>
            {auth && auth.status ? (
              <Link to="/question/ask">
                <Button type="primary">Ask Question</Button>
              </Link>
            ) : (
              <Link to="/sign-in">
                <Button type="primary">Sign In to Ask</Button>
              </Link>
            )}
          </Col>
        </Row>
        <QuestionList />
      </div>
    </div>
  );
};

export default Home;
