import "./DisplayQuestion.css";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Tag, Button, Form, notification } from "antd";
import moment from "moment";

import useAuth from "../Hooks/useAuth";
import instance from "../api";
import Editor from "../Components/Editor/Editor";

const AnswerQuestion = () => {
  const { id } = useParams();
  const { auth } = useAuth();

  const [description, setDescription] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);

  const [form] = Form.useForm();

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

    instance
      .post("/answer", {
        question_id: id,
        answer: JSON.stringify(description),
      })
      .then(res => {
        console.log(res);
        notification.success({
          message: "Submitted",
          description: "You answer has been submitted succesfully",
        });
        setDescription([
          {
            type: "paragraph",
            children: [{ text: "" }],
          },
        ]);
        form.resetFields();
      })
      .catch(error => {
        notification.warn({
          message: "Oops!",
          description:
            "Something went wrong. Your question could not be submitted. Please try again later.",
        });
      });
  };

  return (
    <div className="ask-question">
      <div className="container">
        <h2>Add Your Answer</h2>
        <Form
          form={form}
          autoComplete="off"
          onFinish={onSubmit}
          onFinishFailed={() => {
            validateDescription();
          }}
        >
          <div className="input-group">
            <Editor
              error={isDescriptionEmpty}
              value={description}
              setValue={setDescription}
            />
            {isDescriptionEmpty && (
              <div className="description-error">Description is missing.</div>
            )}
          </div>
          {auth ? (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Post Answer
              </Button>
            </Form.Item>
          ) : (
            <Link to="/sign-in">
              <Button type="primary">Sign In to Answer</Button>
            </Link>
          )}
        </Form>
      </div>
    </div>
  );
};

const DisplayQuestion = ({ item }) => {
  return (
    <div className="ask-question">
      <div className="container">
        <h2>{item && item.question}</h2>
        <p>{item && `Asked ${moment(item.updated_at).fromNow()}`}</p>
        {item && (
          <Editor value={JSON.parse(item.description)} readOnly></Editor>
        )}
        <div className="question-display-tags">
          {item &&
            JSON.parse(item.tags).map((tag, i) => (
              <Tag key={i} color="processing" closable={false}>
                {tag}
              </Tag>
            ))}
        </div>
      </div>
    </div>
  );
};

const Question = () => {
  const [item, setItem] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    instance.get(`/question?id=${id}`).then(res => {
      setItem(res.data.result.question);
      console.log(res);
    });
  }, [id]);

  return (
    <>
      <DisplayQuestion item={item} />
      <AnswerQuestion />
    </>
  );
};

export default Question;
