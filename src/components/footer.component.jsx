import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

function MyFooter() {
  return (
    <>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Individual Assignment ©{new Date().getFullYear()} Created by Nora
        Silfver
      </Footer>
    </>
  );
}

export default MyFooter;
