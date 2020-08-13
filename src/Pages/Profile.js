import "./Profile.css";

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Popconfirm, Modal, notification } from "antd";
import axios from "axios";

import useAuth from "../Hooks/useAuth.js";
import instance from "../api.js";

const UpdateProfile = () => {
  const { auth, setAuth } = useAuth();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      fullname: auth.result.user.fullname ? auth.result.user.fullname : "",
      description: auth.result.user.description
        ? auth.result.user.description
        : "",
    });
  }, [auth, form]);

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

  return (
    <div className="update-profile">
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="fullname" label="Name" labelCol={{ span: 24 }}>
          <Input value={auth.result.user.fullname} />
        </Form.Item>
        <Form.Item name="email" label="Email" labelCol={{ span: 24 }}>
          <Input readOnly value={auth.result.user.email} />
          <small>Email can not be changed.</small>
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
    </div>
  );
};

const ProfileImage = () => {
  const { auth } = useAuth();

  const image = auth.result.user.image
    ? auth.result.user.image
    : require("./../Assets/user.jpg");

  return (
    <div className="profile-image">
      <img src={image} alt={auth.result.user.fullname} />
    </div>
  );
};

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
      <Input
        className={auth.result.user.image ? "" : "no-image"}
        type="file"
        onChange={handleImageChange}
      />
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

const DeleteProfile = () => {
  const { setAuth } = useAuth();
  const history = useHistory();

  const deleteUser = () => {
    instance
      .delete("/user")
      .then(() => {
        history.push("/");
        setAuth(null);
      })
      .catch(error => {
        if (error.message === "Request failed with status code 400") {
          notification.warn({
            message: "Incorrect Password.",
            description: `You can't delete this user right now. Try again later.`,
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
    <div className="delete-profile">
      <Popconfirm
        title="Are you sure delete your account?"
        onConfirm={deleteUser}
        okText="Yes"
        okType="danger primary"
        cancelText="No"
      >
        <Button type="danger">Delete Profile</Button>
      </Popconfirm>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="container">
        <h1>Profile</h1>
        <div className="row">
          <UpdateProfile />
          <div className="col">
            <ProfileImage />
            <ImageUpload />
          </div>
        </div>
        <div className="btn-group">
          <ChangePassword />
          <DeleteProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
