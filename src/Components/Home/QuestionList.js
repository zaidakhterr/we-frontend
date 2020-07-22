import "./Questions.css";

import React, { useState, useEffect } from "react";

import instance from "../../api";
import QuestionItem from "./QuestionItem";

const QuestionList = () => {
  const [items, setItems] = useState([]);

  const getQuestions = () => {
    instance.get("/questions").then(res => {
      setItems(res.data.result.questions);
    });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="question-list">
      {items.map(item => {
        return (
          <QuestionItem
            key={item.id}
            id={item.id}
            question={JSON.parse(item.question)}
            tags={JSON.parse(item.tags)}
          />
        );
      })}
    </div>
  );
};

export default QuestionList;
