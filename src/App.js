import "./App.less";

import React, { useEffect } from "react";
import { Result } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";

import useAuth from "./Hooks/useAuth";
import Footer from "./Components/Layout/Footer";
import api from "./api";

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
        <main className="main">
          {auth && auth.status ? <AuthApp /> : <UnAuthApp />}
        </main>
      </React.Suspense>
      <Footer />
    </div>
  );
};

export default App;
