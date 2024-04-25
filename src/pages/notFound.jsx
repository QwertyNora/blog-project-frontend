import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
import MyFooter from "../components/footer.component";
import NotFound from "../components/notFound.component";

const { Content } = Layout;

function NotFoundPage() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "0 48px", flex: 1 }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Blogerino</Breadcrumb.Item>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>404 - NOT FOUND</Breadcrumb.Item>
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
            <h1>404 - NOT FOUND</h1>
            <p>
              The page you are looking for might have been removed, had its name
              changed or is temporarily unavailable.
            </p>
            <NotFound />
          </Content>
        </Layout>
      </Content>
      <MyFooter />
    </Layout>
  );
}

export default NotFoundPage;
