import styles from "./footer.module.scss";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Footer = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const cookie = Cookies.get("token", "");
    if (cookie) {
      setIsLogin(cookie.length !== 0);
    } else {
      setIsLogin(false);
    }
  }, []);

  const clickLogout = () => {
    Cookies.remove("token");
    window.location.reload();
  };

  const handleClick = (url) => {
    window.location.href = url;
  };

  return (
    <div className={styles.content}>
      <Row>
        <Col span={4}>
          <span style={{ fontSize: "36px" }}>Group38</span>
        </Col>

        <Col span={10}>
          <Button
            onClick={() => handleClick("/")}
            type={"text"}
            style={{ color: "#fff", fontSize: "16px" }}
          >
            Home
          </Button>
        </Col>

        <Col span={10}>
          {isLogin ? (
            <Button
              type={"text"}
              style={{ color: "#fff", fontSize: "16px" }}
              onClick={clickLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => handleClick("/login")}
              type={"text"}
              style={{ color: "#fff", fontSize: "16px" }}
            >
              Login / Register
            </Button>
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: "36px" }}>
        <Col span={24}>
          <span>Powered by Group38</span>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
