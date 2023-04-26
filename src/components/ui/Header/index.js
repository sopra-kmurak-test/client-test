import { Avatar, Button, Col, Dropdown, Menu, Row } from "antd";
import { useEffect, useState } from "react";
import {
  AlertTwoTone,
  NotificationOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./header.module.scss";
import { cleanHasNew, getHasNew } from "helpers/api/user";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    const cookie = Cookies.get("token", "");
    if (cookie) {
      setIsLogin(cookie.length !== 0);
    } else {
      setIsLogin(false);
    }
  }, []);
  //等下要恢复这个
  // useEffect(() => {
  //     const timer = setInterval(() => {
  //         getHasNew().then(response => {
  //             setHasNew(response.has_new);
  //         });
  //     }, 1000);
  //
  //     return () => clearInterval(timer);
  // }, []);

  const getMenu = () => {
    return [{ label: "Home", key: "/" }];
  };

  const handleClick = (url) => {
    // history.push(e.key);
    window.location.href = url;
  };

  const clickLogout = () => {
    // Cookies.remove('token');
    Cookies.remove("token");

    history.push("/Login");
    window.location.reload();
  };
  const clickCenter = () => {
    cleanHasNew();
    // history.push("/Center");
    window.location.href = "/center";
    setHasNew(false);
  };
  const handleSearch = () => {
    console.log(history);
    window.location.href = "/search";
  };

  const items = [
    {
      key: "1",
      label: (
        <div onClick={clickCenter}>
          <span>Center</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={clickLogout}>
          <span>Logout</span>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.header}>
      <Row>
        <Col span={2} offset={2}>
          <div className={styles.log}>
            <span className={styles.logo}>Group38</span>
          </div>
        </Col>
        <Col span={14}>
          <Button
            onClick={() => handleClick("/")}
            type={"text"}
            style={{ color: "#000", fontSize: "16px" }}
          >
            Home
          </Button>

          {/*<Menu className={styles.menu} mode={"horizontal"} items={getMenu()} onClick={handleClick} />*/}
        </Col>
        <Col span={4} offset={2}>
          <Button
            style={{ marginRight: "16px" }}
            shape="circle"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          />
          {isLogin ? (
            <Dropdown
              menu={{
                items,
              }}
              placement="topRight"
              arrow={{
                pointAtCenter: true,
              }}
            >
              {hasNew ? (
                <Avatar icon={<AlertTwoTone />} />
              ) : (
                <Avatar icon={<UserOutlined />} />
              )}
            </Dropdown>
          ) : (
            <Button
              style={{ backgroundColor: "#6F3BF5" }}
              onClick={() => handleClick("/login")}
              type={"primary"}
            >
              Login / Register
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Header;
