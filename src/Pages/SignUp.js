import "./Pages.css";

import React from "react";
import { Form, Input, Button, notification, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { SmileTwoTone } from "@ant-design/icons";

import instance from "../api";
import useAuth from "../Hooks/useAuth";

const SignUp = () => {
  const { setAuth } = useAuth();

  const [form] = Form.useForm();

  const onFinish = values => {
    console.log("values", values);
    instance
      .post("/register", {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
      })
      .then(res => {
        console.log(res);
        setAuth(res.data);
        notification.open({
          message: `Welcome ${values.fullname}!`,
          icon: <SmileTwoTone twoToneColor="#ed9327" />,
          description: (
            <>
              <p>Get started right now.</p>
              <Row gutter={[16, 16]}>
                <Col>
                  <Button type="primary" href="/question/ask" size="small">
                    Ask a Question
                  </Button>
                </Col>
                <Col>
                  <Button type="default" href="/profile" size="small">
                    View Profile
                  </Button>
                </Col>
              </Row>
            </>
          ),
        });
        form.resetFields();
      })
      .catch(error => {
        if (error.message === "Request failed with status code 400") {
          notification.warn({
            message: "Email already exists",
            description: (
              <p>
                User with email <strong>{values.email}</strong> already exists.
                Please try registering with another email
              </p>
            ),
            duration: 5,
          });
        } else {
          notification.error({
            message: "Oops! Something went wrong",
            description: `Something went wrong. Try again Later.`,
            duration: 5,
          });
        }
      });
  };

  return (
    <div className="sign-up-page">
      <div className="form-container">
        <h1 level={1}>Sign Up</h1>
        <Form
          labelCol={{ span: 24 }}
          form={form}
          name="sign-up"
          onFinish={onFinish}
        >
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[
              { required: true, message: "Please input your Full name!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Row justify="center" align="middle">
              <Button type="primary" htmlType="submit" size="large">
                Sign Up
              </Button>
            </Row>
          </Form.Item>
        </Form>

        <p>
          Already have an account? <Link to="/sign-in">Sign In here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
