import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import {
  Button,
  Card,
  Col,
  Divider,
  Image,
  message,
  Pagination,
  Popover,
  Row,
} from "antd";
import { CommentOutlined, LikeTwoTone } from "@ant-design/icons";
import { evaluateQuestion } from "helpers/api/question";
import { getSomeAnswerNew, evaluate } from "helpers/api/answer";
import { translate } from "helpers/api/translator";
import useAuth from "helpers/api/auth";
import styles from "/styles/views/question.create.module.scss";
const requests = axios.create({
  baseURL: process.env.API_HOST, // Change to your desired host and port
});

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { id } = params;
  if (typeof id !== "undefined" && id !== "undefined") {
    const [response1, response2] = await Promise.all([
      requests.get("/question/getQuestion", {
        params: {
          questionId: id,
        },
      }),
      requests.get("/answer/getSomeAnswerNew", {
        params: {
          pageIndex: 1,
          which_question: id,
        },
      }),
    ]);
    const question = response1.data;
    const answer = response2.data;

    return {
      props: {
        question,
        answer,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

const QuestionDetail = ({}) => {
  useAuth();
  const { id } = useParams();
  const router = useHistory();
  const [isTrans, setIsTrans] = useState(false);
  const [article, setArticle] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerCount, setAnswerCount] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    if (id !== undefined && id !== "undefined") {
      Promise.all([
        requests.get("/question/getQuestion", {
          params: {
            questionId: id,
          },
        }),
        requests.get("/answer/getSomeAnswerNew", {
          params: {
            pageIndex: 1,
            which_question: id,
          },
        }),
      ]).then(([response1, response2]) => {
        const question = response1.data;
        const answer = response2.data;
        setArticle(question);
        setAnswers(answer);
        setAnswerCount(question?.answerCount);
      });
    }
  }, []);

  const handleQuestionEvaluate = () => {
    evaluateQuestion({
      questionId: id,
      likeOrDislike: 1,
    }).then((response) => {
      if (response.success === "true") {
        message.info("Thumb up successfully.");
        setArticle((preArticle) => ({
          ...preArticle,
          likeCount: preArticle.likeCount + 1,
        }));
      } else {
        message.error("Thumb up failed.");
      }
    });
  };
  const handleEvaluate = (id) => {
    evaluate({
      answerId: id,
      likeOrDislike: 1,
    }).then((response) => {
      if (response.success === "true") {
        message.info("Thumb up successfully.");
        const newAnswers = answers.map((answer) => {
          if (answer.answer.id === id) {
            answer.likeCount += 1;
          }
          return answer;
        });
        setAnswers(newAnswers);
      } else {
        message.error("Thumb up failed.");
      }
    });
  };

  const translateTitle = () => {
    translate({
      content: article.question.title,
    }).then((response) => {
      const newArticle = article;
      newArticle.question.title = response;
      setArticle(newArticle);
    });

    translate({
      content: article.question.detail,
    }).then((response) => {
      const newArticle = article;
      newArticle.question.detail = response;
      setArticle(newArticle);
    });

    setIsTrans(true);
  };

  const handleChange = (values) => {
    getSomeAnswerNew({
      pageIndex: values,
      which_question: id,
    }).then((response) => {
      if (response) {
        setAnswers(response);
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
            <Row>
              <Col span={3}>
                <Image
                  preview={false}
                  width={64}
                  height={64}
                  src={article.headImg}
                  fallback="data:image/png;base64,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"
                />
              </Col>
              <Col span={13}>
                <p className={styles.name}>{article.nickname}</p>
                <p className={styles.date}>
                  {moment(article.question.submit_time).format("ll")}
                </p>
              </Col>

              <Col>
                <Button
                  style={{ backgroundColor: "#6F3BF5" }}
                  disabled={isTrans}
                  onClick={translateTitle}
                  type={"primary"}
                >
                  Translate Question
                </Button>
              </Col>

              <Col>
                <Button
                  style={{ marginLeft: "8px" }}
                  onClick={() => router.back()}
                >
                  Back
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={18}>
                <span className={styles.title}>{article.question.title}</span>
              </Col>

              <Col span={6}>
                <Button
                  onClick={() => router.push(`/question/${id}/answer`)}
                  style={{ backgroundColor: "#6F3BF5", marginTop: "16px" }}
                  type={"primary"}
                >
                  Answer this Question
                </Button>

                <div
                  style={{
                    float: "right",
                    marginRight: "8px",
                    marginTop: "8px",
                  }}
                >
                  <div
                    className={styles.hover}
                    onClick={handleQuestionEvaluate}
                  >
                    <LikeTwoTone />
                    <span className={styles.date}>
                      {" "}
                      {article.likeCount} like
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <p className={styles.description}>{article.question.detail}</p>
            </Row>

            <p style={{ fontWeight: 600, fontSize: "16px" }}>
              {answerCount} Answers
            </p>
            {answers.map((answer) => {
              return (
                <div key={answer.answer.id}>
                  <Row>
                    <Col span={3}>
                      <Image
                        preview={false}
                        width={48}
                        height={48}
                        src={article.headImg}
                        fallback="data:image/png;base64,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"
                      />

                      {user && user.username === answer.answererNickName ? (
                        <div>
                          <p
                            className={styles.name}
                            style={{ fontSize: "12px", marginTop: "4px" }}
                          >
                            {answer.answererNickName}
                          </p>
                        </div>
                      ) : (
                        <div
                          onClick={() =>
                            router.push({
                              pathname: "/chat",
                              query: {
                                fromUserId: user.id,
                                toUserId: answer.answererId,
                              },
                            })
                          }
                          className={styles.username}
                        >
                          <p
                            className={styles.name}
                            style={{ fontSize: "12px", marginTop: "4px" }}
                          >
                            {answer.answererNickName}
                          </p>
                        </div>
                      )}
                    </Col>

                    <Col span={18}>
                      <div
                        onClick={() => {
                          router.push(`/question/answer/${answer.answer.id}`);
                        }}
                        className={styles.comment}
                      >
                        <p style={{ marginTop: "0px" }}>
                          {answer.answer.content}
                        </p>
                        <p>
                          <CommentOutlined />
                          <span
                            className={styles.date}
                            style={{ marginLeft: "4px" }}
                          >
                            {answer.commentCount} comments
                          </span>
                          <span
                            className={styles.date}
                            style={{ float: "right" }}
                          >
                            Posted on{" "}
                            {moment(answer.answer.answer_time).format("ll")}
                          </span>
                        </p>
                      </div>
                    </Col>

                    <Col>
                      <div
                        className={styles.hover}
                        onClick={() => handleEvaluate(answer.answer.id)}
                      >
                        <LikeTwoTone />
                        <span
                          style={{ marginLeft: "4px" }}
                          className={styles.date}
                        >
                          {answer.likeCount} likes
                        </span>
                      </div>
                    </Col>
                  </Row>

                  <Divider />
                </div>
              );
            })}

            <Pagination
              onChange={handleChange}
              style={{ marginTop: "24px", textAlign: "center" }}
              defaultPageSize={3}
              defaultCurrent={1}
              total={answerCount}
            ></Pagination>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuestionDetail;
