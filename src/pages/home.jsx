import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, theme, Menu, Pagination } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Post from "../components/post.component";
import MyFooter from "../components/footer.component";
import BlogerinoLogo from "../assets/Blogerino.svg";
import { fetchPosts } from "../services/post.service";

const { Content, Sider } = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

function Home() {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleFetchPosts = async (page) => {
    try {
      const data = await fetchPosts(page);
      setPosts(data.posts);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    handleFetchPosts(1); // Initial fetch for page 1
  }, []);

  return (
    <Layout>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Blogerino</Breadcrumb.Item>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <a href="/">
          <img src={BlogerinoLogo} alt="Blogination Logoo" />
        </a>

        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
              }}
              items={items2}
            />
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            <h2>Latest Posts</h2>
            {posts.map((post) => (
              <Post
                key={post._id}
                postId={post._id}
                title={post.title}
                content={post.content}
                createdBy={post.createdBy}
              />
              // Ensure that Post component is set up to receive and display these props
            ))}
            <Pagination
              current={pagination.currentPage}
              total={pagination.totalPages * 10} // total number of pages times 10 (since default pageSize is 10)
              onChange={(page) => handleFetchPosts(page)}
            />
          </Content>
        </Layout>
      </Content>
      <MyFooter />
    </Layout>
  );
}

export default Home;
