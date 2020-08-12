import "./Profile.css";

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Popconfirm,
  Modal,
  notification,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import useAuth from "../Hooks/useAuth.js";
import instance from "../api.js";
import axios from "axios";

const ImageUpload = () => {
  const { auth, setAuth } = useAuth();

  const uploadImage = async ({ file }) => {
    try {
      const res = await instance.post("/getSignedUrl", {
        name: file.name,
        type: file.type,
      });

      const { url } = res.data.result;

      await axios.put(url, file);

      const resUser = await instance.put("/user", {
        fullname: auth.result.user.fullname,
        email: auth.result.user.email,
        description: auth.result.user.description,
        image: url.slice(0, url.indexOf("?")),
      });

      setAuth(a => ({
        ...a,
        result: { ...a.result, user: resUser.data.result.user },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = e => {
    e.preventDefault();

    console.log("Handle Image Change : ", e.target.files[0]);
    let reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      uploadImage({ file });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="image-upload">
      <Input type="file" onChange={handleImageChange} />;
    </div>
  );
};

const ChangePassword = () => {
  const [visible, setVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = () => {
    console.log(oldPassword, newPassword);
    instance
      .put("/changePassword", {
        old_password: oldPassword,
        new_password: newPassword,
      })
      .then(() => {
        setVisible(false);
        setOldPassword("");
        setNewPassword("");
        notification.success({
          message: "Submitted",
          description: "Your password has been changed succesfully",
        });
      })
      .catch(error => {
        if (error.message === "Request failed with status code 400") {
          notification.warn({
            message: "Incorrect Password.",
            description: `You entered an incorrect Password. Please enter the correct one and try again`,
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
    <div className="change-password">
      <Button type="primary" onClick={() => setVisible(true)}>
        Change Password
      </Button>
      <Modal
        title="Change Password"
        visible={visible}
        onOk={changePassword}
        okText="Save Changes"
        onCancel={() => setVisible(false)}
      >
        <Form>
          <Form.Item
            name="old_password"
            label="Current Password"
            labelCol={{ span: 24 }}
          >
            <Input
              type="password"
              value={oldPassword}
              onChange={event => setOldPassword(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="new_password"
            label="New Password"
            labelCol={{ span: 24 }}
          >
            <Input
              type="password"
              value={newPassword}
              onChange={event => setNewPassword(event.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const [form] = Form.useForm();

  //Make API request here
  const handleSubmit = values => {
    if (values) {
      instance
        .put("/user", {
          fullname: values.fullname,
          email: values.email,
          description: values.description,
          image: auth.result.user.image,
        })
        .then(res =>
          setAuth(a => ({
            ...a,
            result: { ...a.result, user: res.data.result.user },
          }))
        );
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      email: auth.result.user.email,
      fullname: auth.result.user.fullname ? auth.result.user.fullname : "",
      description: auth.result.user.description
        ? auth.result.user.description
        : "",
    });

    handleSubmit();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUser = () => {
    instance.delete("/user").then(res => setAuth(null));
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="form">
          <Typography.Title level={1}>Profile</Typography.Title>
          <Form form={form} onFinish={handleSubmit}>
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
              <Input readOnly />
            </Form.Item>
            <Form.Item name="description" label="Bio" labelCol={{ span: 24 }}>
              <Input.TextArea autoSize={{ minRows: 4, maxRows: 8 }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Profile
              </Button>
            </Form.Item>
          </Form>

          <Popconfirm
            title="Are you sure delete your account?"
            onConfirm={deleteUser}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete Account</Button>
          </Popconfirm>
          <ChangePassword />
          <ImageUpload />
        </div>
      </div>
    </div>
  );
};

export default Profile;
