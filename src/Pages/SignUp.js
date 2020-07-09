import "./Pages.css";

import React from "react";

import { Form, Input, Button } from 'antd';

const SignUp = () => {

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
    <div className="form__container">
      <div className="sign-up-page">
        <Form labelCol={{ span: 24 }} form={form} name='sign-up' onFinish={onFinish} /*{...layout}*/>

            <Form.Item 
              label="Fullname"
              name="Fullname"
              rules={[{ required: true, message: 'Please input your username!' }]}
            > 
              <Input size="large"/>
            </Form.Item >

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
            
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password size="large"/>
            </Form.Item>

            <div className="form__signup__button">
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" size="large">
                  SignUp
                </Button>
              </Form.Item>
            </div>

        </Form>  
      </div>
    </div>
  );
};



export default SignUp;

