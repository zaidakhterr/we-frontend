import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

import { Typography, Row, Col, Button } from 'antd';
//import Questions from "../Components/Home/Questions";

const { Title } = Typography;

const Home = () => {
  const { auth } = useAuth();
  return (
    <div className="home-page">
      <div className="container">
        <Row type="flex" justify="space-between" align="middle">
          <Col><Title>Top Questions</Title></Col>
          <Col>{auth && auth.status 
          ? <Link to="/question/ask"><Button type="primary">Ask Question</Button></Link> 
          : <h1>hello</h1>}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
