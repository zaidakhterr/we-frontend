import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./Components/Layout/Navbar";

const Home = React.lazy(() => import("./Pages/Home"));
const NotFound = React.lazy(() => import("./Pages/404"));
const SignIn = React.lazy(() => import("./Pages/SignIn"));
const SignUp = React.lazy(() => import("./Pages/SignUp"));
const Question = React.lazy(() => import("./Pages/Question"));

const UnAuthApp = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route exact path="/sign-in" children={<SignIn />} />
        <Route exact path="/sign-up" children={<SignUp />} />

        <Route exact path="/question/:id" children={<Question />} />

        {/* This stays in the end */}
        <Route path="/*" children={<NotFound />} />
      </Switch>
    </>
  );
};

export default UnAuthApp;
