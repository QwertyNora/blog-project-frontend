import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/post.service";

const CreatePostForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Still needed for checking login state

  const onFinish = async (values) => {
    if (!token) {
      message.error("You must be logged in to create a post.");
      return;
    }

    try {
      await createPost(values); // Using createPost from post.service.js
      message.success("Post created successfully");
      navigate("/");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      message.error(`Failed to create post: ${errorMessage}`);
    }
  };

  if (!token) {
    return (
      <div>
        <p>You have to log in to create a post</p>
        <Button onClick={() => navigate("/auth/login")}>Go to Login</Button>
      </div>
    );
  }

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="content" label="Content" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatePostForm;

const ColorList = [
  "#ffdae9",
  "#ef97b4",
  "#b3ff66",
  "#fdb0c7",
  "#b7b4d2",
  "#ffc2d1",
  "#fb6f92",
  "#809bce",
  "#b8e0d2",
  "#ffee93",
  "#f68c70",
  "#f6ac69",
  "#f6bc66",
  "#cdb4db",
  "#ffc8dd",
  "#ffafcc",
  "#bde0fe",
  "#a2d2ff",
];
