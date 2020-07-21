import "./Questions.css";

import React from "react";

import { Tag } from 'antd';

const QuestionItem = ({question, tags}) => { 

  return (
    <div className="question-item">
    <p>{question}</p>
    <p>{
      <Tag 
        color="processing" 
        closable={false}>{tags}
      </Tag>
    }</p>
    </div>
  );
};

export default QuestionItem;