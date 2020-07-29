import React from "react";
import ReactDOM from 'react-dom';
import { UserOutlined } from '@ant-design/icons';
import useAuth from "../Hooks/useAuth.js";
import { Form, Input, Button} from 'antd';
import { Typography } from 'antd';
import {useEffect} from 'react';
import './Profile.css';



//const { setAuth } = useAuth();
const Profile = () => {
 
  const { auth } = useAuth();
  const [form] = Form.useForm();

  /*const Demo = () => {
    const onFinish = values => {
      console.log(values);
    }*/
    
    useEffect(() => {
      form.setFieldsValue({
        email: auth.result.user.email,
        //fullname: "auth.result.user.fullname"
      })
      console.log(auth.result.user.email)
    },[auth,form]);
  return (
  <div className="profile-page">
        <Typography.Title level={1}>Profile</Typography.Title>
          <Form  onFinish={() =>
          console.log(auth.result.user)

          }> 
      <Form.Item
        name='fullname'
        label="Name"     
        labelCol={{ span: 24 }}

        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input value={auth.result.user.fullname} />
        
      </Form.Item>
      <Form.Item
        name='email'
        label="Email"
        labelCol={{ span: 24 }}

        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
        
      </Form.Item>
      <Form.Item name={['user', 'bio']} 
      label="Bio"
      labelCol={{ span: 24 }}
>
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button onClick={() =>
          console.log(auth.result.user.fullname)} >Submit</Button>
      </Form.Item> 
     
    </Form>

  </div>
  );
      
};

export default Profile;
//<Form /*{...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}*/> 
