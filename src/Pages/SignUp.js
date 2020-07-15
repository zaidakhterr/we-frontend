import "./Pages.css";

import React from "react";

import { Form, Input, Button, notification, Typography, Row } from "antd";

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
        setAuth(JSON.stringify(res.data));
      })
      .catch(error =>
        notification.warn({
          message: "Email already exists",
          description:
            "User with this Email already exists. Please try registering with another Email",
        })
      );
  };

  return (
    <div className="sign-up-page">
      <div className="form-container">
        <Typography.Title level={1}>Sign Up</Typography.Title>
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
      </div>
    </div>
  );
};

export default SignUp;
