import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthNavbar from "./Components/Layout/AuthNavbar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/404";
import AskQuestion from "./Pages/AskQuestion";
import Question from "./Pages/Question";

// import AnswerQues from "./Pages/sampleCheck";

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

        <Route exact path="/question/:id" children={<Question/>} />


        {/* <Route exact path="/answer-ques" children={<AnswerQues/>} /> */}
        
        {/* This stays in the end */}
        <Route path="/*" children={<NotFound />} />
      </Switch>
    </>
  );
};

export default AuthApp;
