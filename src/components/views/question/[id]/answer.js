import styles from "styles/views/question.create.module.scss";
import { Button, Card, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { getQuestion } from "helpers/api/question";
import { newAnswer } from "helpers/api/answer";
import useAuth from "helpers/api/auth";
import axios from "axios";
import { useHistory } from "react-router-dom";
const requests = axios.create({
  baseURL: process.env.API_HOST, // Change to your desired host and port
});

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { id } = params;
  if (typeof id !== "undefined" && id !== "undefined") {
    const response = await requests.get("/question/getQuestion", {
      params: {
        questionId: id,
      },
    });
    const question = response.data;

    return {
      props: {
        question,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
const Answer = ({ question }) => {
  useAuth();
  const router = useHistory();
  const { id } = router.query;
  const [article, setArticle] = useState(question);

  useEffect(() => {
    getQuestion({
      questionId: id,
    }).then((response) => {
      setArticle(response);
    });
  }, []);

  const onFinish = (values) => {
    values["which_question"] = id;
    newAnswer(values).then((response) => {
      if (response.success === "true") {
        message.info("Answer successfully.");
        router.push(`/question/${id}`);
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {article && (
          <Card
            style={{ width: 765 }}
            cover={
              <img
                style={{
                  height: "256px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                alt="example"
                src="https://cdn.pixabay.com/photo/2020/04/19/08/17/watercolor-5062356_960_720.jpg"
              />
            }
          >
            <p className={styles.title} style={{ marginTop: "0px" }}>
              {article.question.title}
            </p>
            <p className={styles.description} style={{ marginTop: "0px" }}>
              {article.question.detail}
            </p>

            <Form onFinish={onFinish}>
              <Form.Item
                name={"content"}
                style={{ marginTop: "24px" }}
                rules={[
                  { required: true, message: "please input your answer." },
                ]}
              >
                <Input.TextArea
                  size={"large"}
                  placeholder={"Type your answer here."}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType={"submit"}
                  style={{ backgroundColor: "#6F3BF5" }}
                  size={"large"}
                  type={"primary"}
                >
                  Answer
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Answer;
