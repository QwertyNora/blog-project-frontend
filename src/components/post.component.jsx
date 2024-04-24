import React, { useState, useEffect } from "react";
import { Divider, Space, Avatar, Button } from "antd";
import Styles from "../styles/post.module.css";
import { EditTwoTone, HeartTwoTone } from "@ant-design/icons";

function Post() {
  const UserList = ["NS", "LT", "AK", "CE"];
  const ColorList = ["#ffdae9", "#ef97b4", "#fdb0c7", "#b7b4d2", "#d4a4"];

  const [user, setUser] = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);

  // Set a random color when the component mounts
  useEffect(() => {
    const randomColor = getRandomColor();
    setColor(randomColor);
  }, []);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * ColorList.length);
    return ColorList[randomIndex];
  };

  const changeUser = () => {
    const index = UserList.indexOf(user);
    setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
    setColor(getRandomColor()); // Set a new random color
  };

  return (
    <>
      <div className={Styles.PostWrapper}>
        <Divider orientation="left">
          <Avatar
            style={{ backgroundColor: color, verticalAlign: "middle" }}
            size="large"
          >
            {user}
          </Avatar>
          <Button
            size="small"
            style={{ margin: "0 16px", verticalAlign: "middle" }}
            onClick={changeUser}
          >
            Change user
          </Button>
          Title
        </Divider>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
          merninisti licere mihi ista probare, quae sunt a te dicta? Refert
          tamen, quo modo.
        </p>
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
