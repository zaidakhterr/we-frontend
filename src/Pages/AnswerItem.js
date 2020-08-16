import "../Components/Home/Questions.css";

import React from "react";
// import moment from "moment";
// import { Tag } from "antd";
// import { Link } from "react-router-dom";

const AnswerItem = ({answer }) => {
  return (
      <div className="question-item">
        <div className="main">
          <p>{answer}</p>
          {/* {tags.map((tag, i) => (
            <Tag key={i} color="processing" closable={false}>
              {tag}
            </Tag>
          ))} */}
        </div>
        {/* <p className="time">Answered {moment(time).fromNow()}</p> */}
      </div>

  );
};

export default AnswerItem;