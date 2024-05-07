import React from "react";
import { Avatar, Space, Button } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import Styles from "../styles/comment.module.css";

function CommentComponent({ comment, onDeleteComment, isAdmin }) {
  const createdBy = comment.createdBy || { firstName: "Unknown", lastName: "" };
  const initials = `${createdBy.firstName[0]}${createdBy.lastName[0]}`;
  const backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(
    16
  )}`; // Generates a random color

  return (
    <div className={Styles.CommentWrapper}>
      <Space>
        <Avatar style={{ backgroundColor }} icon={<UserOutlined />} />
        <p>
          <strong>
            {comment.createdBy.firstName} {comment.createdBy.lastName}{" "}
            commented:
          </strong>
        </p>
      </Space>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>{comment.content}</p>
        {isAdmin && (
          <Button
            icon={<DeleteOutlined />}
            onClick={() => onDeleteComment(comment._id)}
            style={{ width: "fit-content" }}
          >
            Delete Comment
          </Button>
        )}
      </div>
    </div>
  );
}

export default CommentComponent;
