import "./pages.css";

import React, { useState, useEffect, useCallback } from "react";
import { Input, Typography, Button, Form } from "antd";

import Editor from "../Components/Editor/Editor";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);

  const validateDescription = useCallback(() => {
    for (let node of description) {
      for (let leaf of node.children) {
        if (leaf.text !== "") {
          setIsDescriptionEmpty(false);
          return true;
        }
      }
    }
    setIsDescriptionEmpty(true);
    return false;
  }, [description]);

  useEffect(() => {
    if (isDescriptionEmpty) {
      validateDescription();
    }
  }, [isDescriptionEmpty, validateDescription]);

  const onSubmit = () => {
    if (!validateDescription()) return;
    console.log("SUBMIT");
  };

  return (
    <div className="ask-question">
      <div className="container">
        <Typography.Title level={1}>Ask a question</Typography.Title>
        <Form
          onFinish={onSubmit}
          onFinishFailed={() => {
            validateDescription();
          }}
        >
          <div className="input-group">
            <h3 level={4}>Question</h3>
            <small>Frame your question into simple and specific words</small>
            <Form.Item
              name="question"
              rules={[{ required: true, message: "Question is missing." }]}
            >
              <Input
                value={question}
                onChange={e => setQuestion(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className="input-group">
            <h3 level={4}>Desription</h3>
            <small>
              Include all the information someone would need to answer your
              question
            </small>
            <Editor
              error={isDescriptionEmpty}
              value={description}
              setValue={setDescription}
            />
            {isDescriptionEmpty && (
              <div className="description-error">Description is missing.</div>
            )}
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Ask Question
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddQuestion;
