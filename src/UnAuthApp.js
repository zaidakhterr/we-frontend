import React from "react";
import { Switch, Route } from "react-router-dom";

import { Navbar } from "./Components/UnAuth";
import Home from "./Pages/Home";
import NotFound from "./Pages/404";

const UnAuthApp = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" children={<Home />} />

        {/* This stays in the end */}
        <Route path="/*" children={<NotFound />} />
      </Switch>
    </div>
  );
};

export default UnAuthApp;
