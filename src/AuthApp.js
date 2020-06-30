import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Pages/Home";
import NotFound from "./Pages/404";

const AuthApp = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" children={<Home />} />

        {/* This stays in the end */}
        <Route path="/*" children={<NotFound />} />
      </Switch>
    </div>
  );
};

export default AuthApp;
