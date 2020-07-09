import "./App.less";
import Footer from "./Components/Layout/Footer";

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
  // const { auth } = useAuth();
  const auth = { status: true };

  return (
    <div className="app">
      <React.Suspense fallback={<Loader />}>
        {auth && auth.status ? <AuthApp /> : <UnAuthApp />}
      </React.Suspense>
      <Footer />
    </div>
  );
};

export default App;
