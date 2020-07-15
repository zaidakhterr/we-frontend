import React from "react";
import { Switch, Route } from "react-router-dom";

import AuthNavbar from "./Components/Layout/AuthNavbar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/404";

const AuthApp = () => {
  return (
    <>
      <AuthNavbar />
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route exact path="/profile" children={<Profile />} />

        {/* This stays in the end */}
        <Route path="/*" children={<NotFound />} />
      </Switch>
    </>
  );
};

export default AuthApp;
