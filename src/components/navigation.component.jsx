import React from "react";
import { Layout, Menu, ConfigProvider } from "antd";
import { Link, useLocation } from "react-router-dom";
import Styles from "../styles/navigation.module.css";
import Blogerino from "../assets/Blogerino4.svg";

const { Header } = Layout;

const items = [
  { key: "1", label: "Home", path: "/" },
  { key: "2", label: "Register", path: "/auth/register" },
  { key: "3", label: "Login", path: "/auth/login" },
  { key: "4", label: "Create Post", path: "/create-post" },
];

function Navigation() {
  const location = useLocation(); // Get current location
  const currentKey =
    items.find((item) => item.path === location.pathname)?.key || "1";

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#ef97b4",
          borderRadius: 2,
        },
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffdae9",
        }}
      >
        <a href="/" className={Styles.LogoLink}>
          <img src={Blogerino} alt="Blogination Logo" />
        </a>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[currentKey]}
          style={{
            flex: 1,
            minWidth: 0,
            padding: "0 48px",
          }}
          className={Styles.CustomMenu}
        >
          {items.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
    </ConfigProvider>
  );
}

export default Navigation;
