import "./DisplayQuestion.css";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Tag, Button, Row, Col, Form, notification } from "antd";
import moment from "moment";
import useAuth from "../Hooks/useAuth";

import instance from "../api";
import Editor from "../Components/Editor/Editor";

const AnswerQuestion= () => {
  const { id } = useParams();

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
    // <div className="home-page">
    //   <div className="container">
        // <Row align="top" type="flex" justify="space-between">
        // <Col /*s={8} sm={10} md={16} lg={18} xl={22}/*flex="2 2 200px" span={17}*/>
    <div className="ask-question">
      <div className="container">
        <h2>Your Answer</h2>
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Post Answer
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* </div>
      </Col>
      </Row> */}
    </div>
    // </div>
  );
};

// const AnswerButton = ({}) => {
//   const [button, hideButton] = useState(true);
//   const [answerEditor, showAnswerEditor] = useState(false);

//   return (
//     <div>{button && <Button type="primary" onClick={() => showAnswerEditor(!answerEditor)}>Add Answer</Button>}</div>
//   )
// }

const DisplayQuestion = ({ item }) => {
  const [answerEditor, showAnswerEditor] = useState(false);
  // const [postButton, hidePostButton] = useState(true);
  const { auth } = useAuth();
  // const onClickbtn = () => {
  //   <div><AnswerQuestion/></div>
  // }

  return (
    <div className="-page">
      <div className="container">
        <Row align="top" type="flex" justify="space-between">
          <Col s={8} sm={10} md={16} lg={18} xl={22}/*flex="2 2 200px" span={17}*/>
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
        <div>{answerEditor && <AnswerQuestion/>}</div>
        </Col>
        <Col xs={18} sm={14} md={10} lg={6} xl={2}/*flex="0 0 300px"span={4} offset={2} */ className="question-postanswer-button">
        {auth && auth.status ? (
        //<Link to="/question/:id">      
        <Button type="primary" /*disabled*/ onClick={(event) => {
          showAnswerEditor(!answerEditor);
          event.target.classList.add('post-answer-button')
        }}>Add Answer</Button>
        //</Link> 
            ) : (
              <Link to="/sign-in">
                <Button type="primary" >Sign In to Answer</Button>
              </Link>
            )}
            </Col>
          </Row>
      </div>
    </div>
  );
};

const Question = () => {
  const [item, setItem] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    instance.get(`/question?id=${id}`).then(res => {
      setItem(res.data.result.question)
      // console.log(auth);
    });
  });

  return (
    <>
      <DisplayQuestion item={item} />
    </>
  );
};

export default Question;
