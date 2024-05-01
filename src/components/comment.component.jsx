import React from "react";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

function CommentComponent({ comment }) {
  const initials = `${comment.createdBy.firstName[0]}${comment.createdBy.lastName[0]}`;
  const backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(
    16
  )}`; // Generates a random color

  return (
    <div
      style={{ padding: "10px", border: "1px solid #ccc", marginTop: "10px" }}
    >
      <Space>
        <Avatar style={{ backgroundColor }} icon={<UserOutlined />} />
        <p>
          <strong>
            {comment.createdBy.firstName} {comment.createdBy.lastName}{" "}
            commented:
          </strong>
        </p>
      </Space>
      <p>{comment.content}</p>
    </div>
  );
}

export default CommentComponent;
