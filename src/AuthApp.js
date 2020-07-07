import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./Pages/Home";
import NotFound from "./Pages/404";
import AskQuestion from "./Pages/AskQuestion";

const AuthApp = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route
          exact
          path="/question"
          children={<Redirect to="/question/ask" />}
        />
        <Route exact path="/question/ask" children={<AskQuestion />} />

        {/* This stays in the end */}
        <Route path="/*" children={<NotFound />} />
      </Switch>
    </div>
  );
};

export default AuthApp;
