import React, { useState } from "react";
import {
  Divider,
  Space,
  Button,
  Form,
  Input,
  Checkbox,
  Modal,
  ConfigProvider,
  Typography,
} from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import Styles from "../styles/registerForm.module.css";
import { registerUser } from "../services/auth.service";
import SuccessAnimation from "../assets/animations/success";

const { Text, Title, Paragraph } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterForm() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const onFinish = async (values) => {
    try {
      const user = await registerUser(values); // Regiser user from services (auth.service.js)
      console.log("User registered:", user);
      setUserData(user);
      setVisible(true);
    } catch (error) {
      console.error("Registration error:", error.response.data);
    }
  };

  return (
    <>
      <div className={Styles.FormWrapper}>
        <Divider orientation="left">Register</Divider>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          style={{
            width: "70%",
            maxWidth: 900,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
                min: 3,
                max: 25,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters.",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The passwords that you have entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the{" "}
              <a href="" style={{ color: "#eb2f96" }}>
                agreement
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Divider orientation="right">
              <ConfigProvider
                theme={{
                  token: {
                    // Seed Token
                    colorPrimary: "#fff0f6",
                    borderRadius: 3,

                    // Alias Token
                    colorBgContainer: "#fff0f6",
                  },
                }}
              >
                <Space>
                  <HeartTwoTone twoToneColor="#eb2f96" />
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ borderColor: "#eb2f96", color: "#eb2f96" }}
                  >
                    Register me!
                  </Button>
                  <HeartTwoTone twoToneColor="#eb2f96" />
                </Space>
              </ConfigProvider>
            </Divider>
          </Form.Item>
        </Form>
      </div>
      <Modal
        // title="Registration Successful!"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={[
          <Button
            key="login"
            type="primary"
            onClick={() => {
              setVisible(false);
              window.location.href = "/login"; // Redirect to login page or handle the routing
            }}
          >
            Log in
          </Button>,
        ]}
      >
        <SuccessAnimation />
        <Space>
          <Title level={2}>Registration Successful!</Title>
        </Space>
        <Paragraph>
          You have successfully registered as a user on Blogerino!
        </Paragraph>
        <Paragraph>
          Welcome
          <Text keyboard>{userData?.username}</Text>. You can now log in and
          start creating your own posts and comment on other users posts!
        </Paragraph>
      </Modal>
    </>
  );
}

export default RegisterForm;
