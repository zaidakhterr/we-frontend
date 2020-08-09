import "./Pages.css";

import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, notification, Row } from "antd";

import useAuth from "../Hooks/useAuth";

import instance from "../api";

const SignIn = () => {
  const { setAuth } = useAuth();

  const [form] = Form.useForm();

  const onFinish = values => {
    instance
      .post("/login", {
        email: values.email,
        password: values.password,
      })
      .then(res => {
        setAuth(res.data);
        form.resetFields();
      })
      .catch((error, res) => {
        if (error.message === "Request failed with status code 400") {
          notification.warn({
            message: "Incorrect Email or password.",
            description: `You entered an incorrect Email or Password. Please enter the correct one and try again`,
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
    <div className="sign-in-page">
      <div className="form-container">
        <h1 level={1}>Sign In</h1>

        <Form
          labelCol={{ span: 24 }}
          form={form}
          name="sign-in"
          onFinish={onFinish}
          autoComplete="on"
        >
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

          <Form.Item>
            <Row justify="center" align="middle">
              <Button type="primary" htmlType="submit" size="large">
                Sign In
              </Button>
            </Row>
          </Form.Item>
        </Form>

        <p>
          Don't have an account? <Link to="/sign-up">Sign Up here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
