import React, { useState } from "react";
import { Button, Form, Input, Modal, ConfigProvider, Typography } from "antd";
import {
  LockOutlined,
  MailOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import Styles from "../styles/registerForm.module.css";
import { loginUser } from "../services/auth.service";
import LoginSuccessAnimation from "../assets/animations/loginSuccess";

function LoginForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    content: "",
  });

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await loginUser(values);
      console.log("Login successful:", response);
      localStorage.setItem("token", response.tokens.access);
      localStorage.setItem("isAdmin", response.user.admin);
      setModal({
        visible: true,
        title: <div style={{ textAlign: "center" }}>Login Successful!</div>, // Centering the title
        content: "",
        style: { color: "#52c41a" },
      });
      form.resetFields();
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setModal({
        visible: true,
        title: <div style={{ textAlign: "center" }}>Login Not Successful</div>, // Centering the title
        content: "Credentials missing or invalid.",
        style: { color: "#ff4d4f" },
      });
      form.resetFields(); // Clear form fields even on failure
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModal({ ...modal, visible: false });
  };

  return (
    <>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title={modal.title}
        visible={modal.visible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        bodyStyle={modal.style}
      >
        <LoginSuccessAnimation />
        <p>{modal.content}</p>
      </Modal>
    </>
  );
}

export default LoginForm;
