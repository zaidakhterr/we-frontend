import "./DisplayQuestion.css";
import "../Components/Home/Questions.css";

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
        notification.success({
          message: "Submitted",
          description: "You answer has been submitted successfully",
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
    <div className="add-answer">
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
    <div className="question">
      <div className="container">
        <h2>{item && item.question}</h2>
        <p>
          {item &&
            `Asked by ${item.user.fullname} ${moment(
              item.updated_at
            ).fromNow()}`}
        </p>
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
  const [answers, setAnswers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    instance.get(`/question?id=${id}`).then(res => {
      setItem(res.data.result.question);
      setAnswers(res.data.result.answers);
      console.log(res.data.result.question);
    });
  }, [id]);

  return (
    <>
      <DisplayQuestion item={item} />
      <div className="container">
        <h3>
          {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
        </h3>
      </div>
      {answers.map(ans => {
        return ans ? (
          <div className="answer">
            <div className="container">
              <Editor value={JSON.parse(ans.answer)} readOnly></Editor>
              <p>
                Answered by {ans.user.fullname}{" "}
                {moment(ans.updated_at).fromNow()}
              </p>
            </div>
          </div>
        ) : null;
      })}
      <AnswerQuestion />
    </>
  );
};

export default Question;
