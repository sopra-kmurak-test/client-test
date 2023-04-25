import style from '@/styles/views/chat.module.scss'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import $ from "jquery";
import { Button, Col, Form, Input, Row } from "antd";


const chat = () => {

  const { TextArea } = Input;
  const url = "https://sopra-fs23-group-38-server.oa.r.appspot.com";

  // Connect to WebSocket
  let stompClient = null;
  function setConnected(connected) {
      $("#connect").prop("disabled", connected);
      $("#disconnect").prop("disabled", !connected);
      $("#chatHistory").html("");
  }
  function connect() {
      console.log("Connected");
      const socket = new SockJS(url + "/websocket");
      stompClient = over(socket);
      stompClient.connect({}, function (frame) {
          setConnected(true);
          console.log('Connected: ' + frame);
          stompClient.subscribe('/receive/chat', function (response) {
              console.log("got a message");
              showMessage(JSON.parse(response.body));
          });
      });
  }
  function disconnect() {
      if (stompClient !== null) {
          stompClient.disconnect();
      }
      setConnected(false);
      console.log("Disconnected");
  }

  // Send message to back-end
  function sendMessage() {
      stompClient.send("/send/chat", {}, JSON.stringify(
          {'userId1': "111", 'message': $("#message").val()}));
      $("#message").val("");
  }

  // Show messages on front-end
  function showMessage(response) {
      var tags = "<div class='" + style.chat_left + "'>";
      tags += "<figure><img src=\"images/user_icon.png\" /></figure>";
      tags += "<div class='" + style.chat_left_text + "'>";
      tags += "<div class='" + style.name + "'>User1</div>";
      tags += "<div class='" + style.text + "'>" + response.message + "</div>";
      tags += "</div></div>"
      $("#chatHistory").append(tags);
  }

  return (
    <div className={style.container}>
      <div className={style.main}>
        <p className={style.formTitle}><span className={style.highlight}>Chat</span> with other users !</p>

        <div id="chatHistory" className={style.chatContents}></div>

        <Form
          name="messageForm"
          >
          <Form.Item
            name="messageInput"
           >
            <TextArea id="message" allowClear rows={4} style={{ width: '540px', height: '60px', marginTop: '12px' }} placeholder={"Please enter your message here..."}/>
          </Form.Item>
        </Form>
        <Row style={{ width: '540px', marginTop: '0px' }}>
          <Col span={6}>
            <Button id="connect" onClick={connect} style={{ backgroundColor: '#6F3BF5', width: '120px', marginRight: '8px' }} shape={"round"} type="primary" size={"large"} htmlType="submit">
              Connect
            </Button>
          </Col>
          <Col span={6}>
            <Button id="disconnect" onClick={disconnect} style={{ backgroundColor: '#6F3BF5', width: '120px', marginRight: '8px' }} shape={"round"} type="primary" size={"large"} htmlType="submit">
              Disconnect
            </Button>
          </Col>
          <Col span={6} offset={6}>
            <Button onClick={sendMessage} style={{ backgroundColor: '#6F3BF5', width: '100px', marginRight: '8px' }} shape={"round"} type="primary" size={"large"} htmlType="submit">
              Send
            </Button>
          </Col>
        </Row>

      </div>
    </div>
  );
};

export default chat;
