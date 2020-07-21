import "./Questions.css";

import React,{ useState, useEffect } from 'react';

import instance from '../../api';
import QuestionItem from './QuestionItem';

const QuestionList = () => {

  const [items, setItems] = useState([]);

  const getQuestions = () => {
    instance.get("/questions")
    .then(res => setItems(res.data.result.questions))};

  useEffect(() => {
    getQuestions();
  }, []);

  console.log(items);
  return(
    <div className="question-list">
      {items.map((item, i) => {
        return(
          <QuestionItem
            key={i}
            question={items[i].question.replace(/"/g, "")} 
            tags={items[i].tags.replace(/[[\]"]+/g,"")}
          />
        );
      })}
    </div>
  );
}

export default QuestionList;