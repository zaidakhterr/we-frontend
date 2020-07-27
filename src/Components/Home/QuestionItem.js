import "./Questions.css";

import React from "react";
import { Tag } from "antd";
import { Link } from "react-router-dom";
import moment from 'moment';

const QuestionItem = ({ id, question, tags, time }) => {
  return (
    <Link to={`/question/${id}`}>
      <div className="question-item">
        <p>{question}</p>
        {tags.map((tag, i) => (
          <Tag key={i} color="processing" closable={false}>
            {tag}
          </Tag>
        ))}
        <p className="question-item-time">Asked {moment(time).fromNow()}</p>
      </div>
    </Link>
  );
};

export default QuestionItem;
