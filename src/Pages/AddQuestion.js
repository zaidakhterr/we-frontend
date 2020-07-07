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
    <div className="add-question" style={{ padding: 10 }}>
      <div className="container">
        <h1>Add Question</h1>
        <Editor value={value} setValue={setValue} />
      </div>
    </div>
  );
};

export default AddQuestion;
