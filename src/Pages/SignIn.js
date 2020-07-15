import "./Pages.css";

import React from "react";

import { Form, Input, Button, notification, Typography, Row } from "antd";

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
        setAuth(JSON.stringify(res.data));
      })
      .catch(error =>
        notification.warn({
          message: "Incorrect Email or password.",
          description:
            "You entered an incorrect Email or Password. Please enter the correct one and try again",
        })
      );
  };

  return (
    <div className="sign-in-page">
      <div className="form-container">
        <Typography.Title level={1}>Sign In</Typography.Title>

        <Form
          labelCol={{ span: 24 }}
          form={form}
          name="sign-in"
          onFinish={onFinish}
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
      </div>
    </div>
  );
};

export default SignIn;
