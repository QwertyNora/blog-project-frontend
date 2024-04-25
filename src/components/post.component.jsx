import React, { useState, useEffect } from "react";
import { Divider, Space, Avatar } from "antd";
import Styles from "../styles/post.module.css";
import { EditTwoTone, HeartTwoTone } from "@ant-design/icons";

function Post({ title, content, createdBy }) {
  const getInitials = (firstName, lastName) => {
    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  };

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

  const [color, setColor] = useState(ColorList[0]);

  useEffect(() => {
    const getRandomColor = () => {
      const randomIndex = Math.floor(Math.random() * ColorList.length);
      return ColorList[randomIndex];
    };
    setColor(getRandomColor());
  }, []);

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
            <EditTwoTone /> Comment
          </Space>
        </Divider>
      </div>
    </>
  );
}

export default Post;

//TODO: Use the random to generate random color each time component is loaded.
