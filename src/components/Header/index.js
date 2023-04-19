import {Button, Col, Menu, Row} from "antd"
import {useRouter} from "next/router";
import styles from "@/components/Header/header.module.less";
import {SearchOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import Cookies from 'js-cookie'

const Header = () => {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const cookie = Cookies.get('token', '')
        if (cookie) {
            setIsLogin(cookie.length !== 0)
        } else {
            setIsLogin(false)
        }

    }, [])

    const getMenu = () => {
        return [
            {label: 'Home', key: '/'},
        ]
    }

    const handleClick = (e) => {
        router.push(e.key)
    }

    const clickLogout = () => {
        Cookies.remove('token')
        router.push("/login").then(() => {
            window.location.reload();
        });
    }

    return (<>
        <div className={styles.header}>
            <Row>
                <Col span={2} offset={2}>
                    <div className={styles.log}>
                        <span className={styles.logo}>Group38</span>
                    </div>
                </Col>

                <Col span={14}>
                    <Menu     className={styles.menu}
                              activeClassName={styles.active} mode={"horizontal"} items={getMenu()} onClick={handleClick} />
                </Col>

                <Col span={4} offset={2}>
                    <Button style={{ marginRight: '16px' }} shape="circle" icon={<SearchOutlined />} onClick={() => router.push("/search")}  />

                    {isLogin ? <Button style={{ backgroundColor: '#6F3BF5' }} onClick={clickLogout} type={"primary"}>Logout</Button> : <Button style={{ backgroundColor: '#6F3BF5' }} onClick={() => router.push("/login")} type={"primary"}>Login/Register</Button>}
                </Col>
            </Row>
        </div>
    </>);
};

export default Header;
