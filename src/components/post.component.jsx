import React, { useState, useEffect } from "react";
import { Divider, Space, Avatar, Modal, Button, Input, message } from "antd";
import { EditTwoTone, HeartTwoTone, MessageTwoTone } from "@ant-design/icons";
import Styles from "../styles/post.module.css";
import { createComment } from "../services/comment.service";
import localStorageKit from "../utils/localStorageKit";

function Post({ title, content, createdBy, postId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    // Add event listener for local storage changes
    window.addEventListener("storage", handleStorageChange);

    // Cleanup to remove event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const showModal = () => {
    if (!token) {
      message.error("You must be logged in to comment");
      return; // Prevent modal from opening if not authenticated
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => setIsModalVisible(false);

  const handleOk = async () => {
    if (!token) {
      message.error("You must be logged in to comment");
      console.log("User is not authenticated");
      handleCancel();
      return;
    }
    try {
      const result = await createComment(postId, { content: commentText });
      message.success("Comment added successfully");
      setCommentText("");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to add comment");
      console.error(error);
    }
  };

  const getInitials = (firstName, lastName) =>
    `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  const initials = createdBy
    ? getInitials(createdBy.firstName, createdBy.lastName)
    : "??";
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
  const [color, setColor] = useState(
    ColorList[Math.floor(Math.random() * ColorList.length)]
  );

  return (
    <>
      <div className={Styles.PostWrapper}>
        <Divider orientation="left">
          <Avatar
            style={{
              backgroundColor: color,
              verticalAlign: "middle",
              marginRight: "16px",
            }}
            size="large"
          >
            {initials}
          </Avatar>
          {title}
        </Divider>
        <p>{content}</p>
        <Divider orientation="right">
          <Space>
            <HeartTwoTone twoToneColor="#eb2f96" />
            <Button type="link" onClick={showModal} icon={<EditTwoTone />}>
              Comment
            </Button>
            <Button type="link" icon={<MessageTwoTone />}>
              Show comments
            </Button>
          </Space>
        </Divider>
      </div>
      <Modal
        title="Leave your comment!"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Leave Comment
          </Button>,
        ]}
      >
        <Input
          placeholder="Write your comment here..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onPressEnter={handleOk}
        />
      </Modal>
    </>
  );
}

export default Post;

//TODO: Use the random to generate random color each time component is loaded.
