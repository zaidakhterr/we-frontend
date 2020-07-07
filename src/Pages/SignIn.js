import "./Pages.css";

import React from "react";

import { Form, Input, Button, Checkbox } from 'antd';


const SignIn = () => {

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    }
  }

  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="sign-in-page">
      <div className="form__container">
        <Form labelCol={{span: 24}} form={form} name='sign-up' onFinish={onFinish}>
          <Form.Item 
            label="Username"
            name="Username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          > 
            <Input size="large"/>
          </Form.Item >

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
