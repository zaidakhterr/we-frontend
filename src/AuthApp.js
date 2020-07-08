import React from "react";
import { Switch, Route } from "react-router-dom";

import AuthNavbar from './Components/Layout/AuthNavbar';
import Home from "./Pages/Home";
import NotFound from "./Pages/404";

const AuthApp = () => {
  return (
    <div>
      <AuthNavbar />
      <Switch>
        <Route exact path="/" children={<Home />} />

        {/* This stays in the end */}
        <Route path="/*" children={<NotFound />} />
      </Switch>
    </div>
  );
};

export default AuthApp;
