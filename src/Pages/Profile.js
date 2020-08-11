import React from "react";
import useAuth from "../Hooks/useAuth.js";
import { Form, Input, Button, Typography, Popconfirm, message } from "antd";
import { useEffect } from "react";
import { useHistory } from "react-router";
import "./Profile.css";
import instance from "../api.js";

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      email: auth.result.user.email,
      fullname: auth.result.user.fullname 
        ? auth.result.user.fullname 
        : "",
      description: auth.result.user.description
        ? auth.result.user.description
        : "",
    });
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    //Make API request here
  const handleSubmit = values => {
    if(values) {
         instance
      .put("/user", {
        fullname: values.fullname,
        email: values.email,
        description: values.description,
        image: auth.result.user.image
      })
      .then(res => setAuth(a => ({...a, result: {...a.result, user: res.data.result.user}})));
    }};

    const confirm = () => {
      instance
      .delete("/user")
      .then(res => setAuth(null));
    }

    const changePassword = pass => {
      instance
      .put("/changePassword")
      .then(pass => console.log(pass));
    }

  return (
    <div className="profile-page">
      {/* Added a container to center the whole thing */}
      <div className="container">
        {/* Placed the form inside a div to give a max-width */}
        <div className="form">
          <Typography.Title level={1}>Profile</Typography.Title>
          {/* I added form={form} right below to link the form with the hook */}
          <Form form={form} onFinish={handleSubmit}>
            {/* Removed the required rule for now */}
            <Form.Item name="fullname" label="Name" labelCol={{ span: 24 }}>
              <Input value={auth.result.user.fullname} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              labelCol={{ span: 24 }}
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input 
                readOnly
              />
            </Form.Item>
            <Form.Item name="description" label="Bio" labelCol={{ span: 24 }}>
              <Input.TextArea autoSize={{ minRows: 4, maxRows: 8 }} />
            </Form.Item>
            <Form.Item>
              {/* Give a type submit */}
                <Button type="primary" htmlType="submit">
                  Update Profile
                </Button>
            </Form.Item>
          </Form>
          <Popconfirm
            title="Are you sure delete your account?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
            >
            <Button type="danger">
              Delete Account
            </Button>
          </Popconfirm>
          <Button type="success" onClick={changePassword}>
              Change Password
            </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
