import React, { useState } from "react";

import Editor from "../Components/Editor/Editor";

const AddQuestion = () => {
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  return (
    <div className="ask-question" style={{ padding: 10 }}>
      <div className="container">
        <h1>Ask Question</h1>
        <Editor value={value} setValue={setValue} />
      </div>
    </div>
  );
};

export default AddQuestion;
