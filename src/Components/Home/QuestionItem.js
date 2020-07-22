import "./Questions.css";

import React from "react";
import { Tag } from "antd";
import { Link } from "react-router-dom";

const QuestionItem = ({ id, question, tags }) => {
  return (
    <Link to={`/question/${id}`}>
      <div className="question-item">
        <p>{question}</p>
        {tags.map((tag, i) => (
          <Tag key={i} color="processing" closable={false}>
            {tag}
          </Tag>
        ))}
      </div>
    </Link>
  );
};

export default QuestionItem;
