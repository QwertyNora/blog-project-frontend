import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
import MyFooter from "../components/footer.component";
import LoginForm from "../components/loginForm.component";

const { Content } = Layout;

function Login() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Breadcrumb style={{ margin: "16px 25px" }}>
        <Breadcrumb.Item>Blogerino</Breadcrumb.Item>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Login</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: "0 48px",
          flex: "1 0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Content
          style={{
            padding: "0 48px",
            flex: 1,
            width: "500px",
            maxWidth: "700px",
          }}
        >
          <Layout
            style={{
              padding: "24px 0",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flex: 1,
            }}
          >
            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
                flex: 1,
              }}
            >
              <LoginForm />
            </Content>
          </Layout>
        </Content>
      </div>

      <MyFooter />
    </Layout>
  );
}

export default Login;
