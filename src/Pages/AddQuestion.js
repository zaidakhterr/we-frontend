// Import React dependencies.
import React, { useEffect, useMemo, useState } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

const AddQuestion = () => {
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <div className="add-question" style={{ backgroundColor: "#f5f5f5" }}>
      <h1>Add Question</h1>
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => setValue(newValue)}
      >
        <Editable
          style={{ border: "1px solid #d9d9d9", padding: 10 }}
          className="add-question-field"
        />
      </Slate>
    </div>
  );
};

export default AddQuestion;
