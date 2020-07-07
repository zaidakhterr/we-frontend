import React, { useState } from "react";

import Editor from "../Components/Editor/Editor";

const AddQuestion = () => {
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  return (
    <div className="add-question" style={{ border: "solid 2px red" }}>
      <div className="container">
        <h1>Add Question</h1>
        <Editor
          value={value}
          setValue={setValue}
          placeholder={"Ask your Question..."}
        />
      </div>
    </div>
  );
};

export default AddQuestion;
