import "./Pages.css";

import React from "react";

import { Form, Input, Button, Checkbox, notification } from "antd";

import useAuth from "../Hooks/useAuth";

import instance from "../api";

const SignIn = () => {
  const {setAuth} = useAuth();

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    }
  }

  const [form] = Form.useForm();

  const onFinish = values => {
    instance.post('/login', {
      "email": values.email,
      "password": values.password
    })
    .then(res => {
      setAuth(JSON.stringify(res.data))
    })
    .catch(error => notification.open({message: 'Incorrect Email or password.'}))
  };

  return (
    <div className="sign-in-page">
      <div className="form__container">
        <Form labelCol={{span: 24}} form={form} name='sign-up' onFinish={onFinish}>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              }]}
              >
              <Input size="large"/>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              ]}
                hasFeedback
          >
            <Input.Password size="large"/>
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" size="large">
              Sign In
            </Button>
          </Form.Item>

        </Form>
      </div>
    </div>
  );
};

export default SignIn;
