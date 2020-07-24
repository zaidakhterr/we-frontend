import "./Questions.css";

import React, { useState, useEffect } from "react";

import instance from "../../api";
import QuestionItem from "./QuestionItem";

const QuestionList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    instance.get("/questions").then(res => {
      setItems(res.data.result.questions);
    });
  }, []);

  return (
    <div className="question-list">
      {items.map(item => {
        return (
          <QuestionItem
            key={item.id}
            id={item.id}
            question={item.question}
            tags={JSON.parse(item.tags)}
          />
        );
      })}
    </div>
  );
};

export default QuestionList;
