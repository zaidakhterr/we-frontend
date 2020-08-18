import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthNavbar from "./Components/Layout/AuthNavbar";

const Home = React.lazy(() => import("./Pages/Home"));
const NotFound = React.lazy(() => import("./Pages/404"));
const Profile = React.lazy(() => import("./Pages/Profile"));
const AskQuestion = React.lazy(() => import("./Pages/AskQuestion"));
const Question = React.lazy(() => import("./Pages/Question"));

const AuthApp = () => {
  return (
    <>
      <AuthNavbar />
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route
          exact
          path="/question"
          children={<Redirect to="/question/ask" />}
        />
        <Route exact path="/sign-in" children={<Redirect to="/" />} />
        <Route exact path="/sign-up" children={<Redirect to="/" />} />

        <Route exact path="/question/ask" children={<AskQuestion />} />
        <Route exact path="/profile" children={<Profile />} />

        <Route exact path="/question/:id" children={<Question />} />

        {/* This stays in the end */}
        <Route path="/*" children={<NotFound />} />
      </Switch>
    </>
  );
};

export default AuthApp;
