import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./Components/Layout/Navbar";
import Home from "./Pages/Home";
import NotFound from "./Pages/404";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

const UnAuthApp = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route exact path="/sign-in" children={<SignIn />} />
        <Route exact path="/sign-up" children={<SignUp />} />

        {/* This stays in the end */}
        <Route path="/*" children={<NotFound />} />
      </Switch>
    </div>
  );
};

export default UnAuthApp;
