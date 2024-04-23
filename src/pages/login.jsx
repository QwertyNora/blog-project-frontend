import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
import MyFooter from "../components/footer.component";
import Navigation from "../components/navigation.component";
// import LoginForm from "../components/LoginForm.component";

const { Content } = Layout;

function Login() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navigation />
      <Content style={{ padding: "0 48px", flex: 1 }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Blogerino</Breadcrumb.Item>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Login</Breadcrumb.Item>
        </Breadcrumb>
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
            {/* <LoginForm /> */}
          </Content>
        </Layout>
      </Content>
      <MyFooter />
    </Layout>
  );
}

export default Login;
