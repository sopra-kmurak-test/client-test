import {Button, Col, Form, Input, message, Row} from "antd";
import style from '@/styles/login.module.less'
import {useRouter} from "next/router";
import {login} from "@/api/user";
import {useDispatch} from "react-redux";
import {handleLogin} from "@/store/modules/user";
import Cookies from 'js-cookie'

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()

  const onFinish = (values) => {
    login(values).then((response) => {
      if (response.success === 'false') {
        message.error('Login failed!')
      } else {
        message.info('Login successfully!')
        Cookies.set('token', response.token)
        dispatch(handleLogin(values))
        router.push('/').then(() => {
          window.location.reload();
        });
      }
    })
  }

  return (
      <div className={style.container}>
        <div className={style.main}>
          <p className={style.formTitle}>Please <span className={style.highlight}>Login</span> / Register !</p>
          <Form
              name="loginForm"
              style={{ width: '400px', textAlign: "center" }}
              onFinish={onFinish}
          >
            <Form.Item
                name="username"
                rules={[{ required: true, message: "please input your username." }]}
            >
              <Input style={{ width: '240px' }} size={"large"} placeholder={"Username"}/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: "please input your password." }]}
            >
              <Input.Password style={{ width: '240px' }} size={"large"} placeholder={"Password"}/>
            </Form.Item>

            <Row style={{ marginTop: '48px' }}>
              <Col span={12}>
                <Button style={{ backgroundColor: '#6F3BF5', width: 160 }} shape={"round"} type="primary" size={"large"} htmlType="submit">
                  Login
                </Button>
              </Col>

              <Col span={12}>
                <Button onClick={() => router.push('/register')} style={{ borderColor: '#6F3BF5', color: '#6F3BF5',  width: 160 }} shape={"round"} size={"large"}>
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
  )
}