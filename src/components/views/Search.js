import { Button, Card, Col, Form, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { search } from "helpers/api/search";
import styles from "styles/views/search.module.scss";

const Search = () => {
    const [items, setItems] = useState([]);
    const history = useHistory();

    const onFinish = (values) => {
        search(values).then((response) => {
            setItems(response);
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <p className={styles.welcome}>Search Your Interests!</p>

                <Form onFinish={onFinish} className={styles.form}>
                    <Row>
                        <Col span={2}>
                            <Button
                                style={{ marginRight: "16px", marginTop: "38px" }}
                                shape="circle"
                                icon={<SearchOutlined />}
                                type={"text"}
                                size={"large"}
                            />
                        </Col>

                        <Col span={22}>
                            <Form.Item
                                name="keyword"
                                rules={[{ required: true, message: "please input your keywords." }]}
                            >
                                <Input
                                    style={{ width: "756px", marginTop: "32px", height: "48px" }}
                                    size={"large"}
                                    placeholder={"Type the keywords here"}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button
                        htmlType={"submit"}
                        style={{
                            marginTop: "32px",
                            width: "128px",
                            height: "48px",
                            backgroundColor: "#6F3BF5",
                        }}
                        type={"primary"}
                        shape={"round"}
                        size={"large"}
                    >
                        Search
                    </Button>

                    {/* eslint-disable-next-line array-callback-return */}
          {items.map((item) => {
            if (item.description !== "用户" && item.description !== "文章") {
              return (
                <div key={item.html_url} className={styles.content}>
                  <Card
                    style={{ width: "756px", padding: 0 }}
                    bodyStyle={{ padding: "16px" }}
                  >
                    <span
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "500px",
                        }}
                        onClick={() => {
                            history.push(item.html_url);
                        }}
                        className={styles.title}
                    >
                      {item.name}
                    </span>

                                        <span style={{ float: "right", marginTop: "8px" }}>
                      {item.type}
                    </span>
                                    </Card>
                                </div>
                            );
                        }
                    })}
                </Form>
            </div>
        </div>
    );
};

export default Search;
