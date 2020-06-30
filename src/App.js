import "./App.less";

import React from "react";

import useAuth from "./Hooks/useAuth";
import { Row, Spin } from "antd";

const AuthApp = React.lazy(() => import("./AuthApp"));
const UnAuthApp = React.lazy(() => import("./UnAuthApp"));

const Loader = () => {
  return (
    <>
      <Row className="loader-container" align="middle" justify="center">
        <Spin size="large" />
      </Row>
    </>
  );
};

const App = () => {
  const auth = useAuth();

  return (
    <div className="app">
      <React.Suspense fallback={<Loader />}>
        {auth && auth.status ? <AuthApp /> : <UnAuthApp />}
      </React.Suspense>
    </div>
  );
};

export default App;
