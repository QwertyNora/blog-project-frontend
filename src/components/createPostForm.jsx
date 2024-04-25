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
