import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Pages/Home";
import NotFound from "./Pages/404";
import AddQuestion from "./Pages/AddQuestion";

const AuthApp = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route exact path="/add-question" children={<AddQuestion />} />

        {/* This stays in the end */}
        <Route path="/*" children={<NotFound />} />
      </Switch>
    </div>
  );
};

export default AuthApp;
