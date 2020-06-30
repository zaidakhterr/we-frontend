import "./App.less";

import React from "react";

import useAuth from "./Hooks/useAuth";
import { Result } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const AuthApp = React.lazy(() => import("./AuthApp"));
const UnAuthApp = React.lazy(() => import("./UnAuthApp"));

const Loader = () => {
  return <Result icon={<Loading3QuartersOutlined />} title="Loading..." />;
};

const App = () => {
  const { auth } = useAuth();

  return (
    <div className="app">
      <React.Suspense fallback={<Loader />}>
        {auth && auth.status ? <AuthApp /> : <UnAuthApp />}
      </React.Suspense>
    </div>
  );
};

export default App;
