import "./Pages.css";

import React from "react";

import { Form, Input, Button } from 'antd';

const SignUp = () => {

  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="container">
      <div className="sign-up-page">
        <Form form={form} name='register' onFinish={onFinish}>

          <div>
            <Form.Item 
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            > 
            </Form.Item >
          </div>

          <div className="formInput">
            <Form.Item><Input/></Form.Item>
          </div>

          <div>
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
            </Form.Item>
          </div>

          <div className="formInput">
              <Form.Item><Input/></Form.Item>
          </div>

          <div>    
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
            </Form.Item>
          </div> 

          <div className="formInput">
            <Form.Item><Input.Password/></Form.Item>
          </div>
            
          <div>
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
            </Form.Item>
          </div>

          <div className="formInput">
            <Form.Item><Input.Password/></Form.Item>
          </div>

          <div className="button-signup">
            <Form.Item >
              <Button type="primary" htmlType="submit">
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