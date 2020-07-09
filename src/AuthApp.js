import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthNavbar from "./Components/Layout/AuthNavbar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/404";
import AskQuestion from "./Pages/AskQuestion";

const AuthApp = () => {
  return (
    <div>
      <AuthNavbar />
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route
          exact
          path="/question"
          children={<Redirect to="/question/ask" />}
        />
        <Route exact path="/question/ask" children={<AskQuestion />} />
        <Route exact path="/profile" children={<Profile />} />

        {/* This stays in the end */}
        <Route path="/*" children={<NotFound />} />
      </Switch>
    </div>
  );
};

export default AuthApp;
