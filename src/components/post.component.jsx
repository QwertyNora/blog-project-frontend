import React, { useState, useEffect } from "react";
import {
  Divider,
  Space,
  Avatar,
  Modal,
  Button,
  Input,
  message,
  Badge,
} from "antd";
import { EditTwoTone, HeartTwoTone, MessageOutlined } from "@ant-design/icons";
import Styles from "../styles/post.module.css";
import CommentComponent from "./comment.component";
import {
  createComment,
  fetchCommentsByPost,
} from "../services/comment.service";
import localStorageKit from "../utils/localStorageKit";

function Post({ title, content, createdBy, postId }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

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

  useEffect(() => {
    fetchCommentsByPost(postId).then(setComments).catch(console.error);
  }, [postId]);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const showModal = () => {
    if (!token) {
      message.error("You must be logged in to comment");
      return;
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    if (!token) {
      message.error("You must be logged in to comment");
      handleCancel();
      return;
    }
    try {
      const result = await createComment(postId, { content: commentText });
      setComments([...comments, result]);
      setCommentText("");
      setIsModalVisible(false);
      message.success("Comment added successfully");
    } catch (error) {
      message.error("Failed to add comment");
      console.error(error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className={Styles.PostWrapper}>
      <Divider orientation="left">
        <Avatar
          style={{
            backgroundColor:
              ColorList[Math.floor(Math.random() * ColorList.length)],
          }}
        >
          {`${createdBy.firstName[0].toUpperCase()}${createdBy.lastName[0].toUpperCase()}`}
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
          <Button
            type="link"
            onClick={toggleComments}
            icon={<MessageOutlined />}
          >
            Show Comments <Badge count={comments.length} showZero />
          </Button>
        </Space>
      </Divider>
      {showComments &&
        comments.map((comment, index) => (
          <CommentComponent key={index} comment={comment} />
        ))}
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
    </div>
  );
}

export default Post;

//TODO: Use the random to generate random color each time component is loaded.
