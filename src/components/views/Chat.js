import React, {useState} from 'react';
//import {api, handleError} from 'helpers/api';
//import User from 'models/User';
//import {useHistory} from 'react-router-dom';
//import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
//import parse from 'html-react-parser';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import $ from "jquery";


const FormField = props => {
  return (
    <div className="chat field">
      <label className="chat label">
        {props.label}
      </label>
      <input
        className="chat input"
        placeholder="enter here.."
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const Chat = props => {
  //const history = useHistory();

  let stompClient = null;
  function setConnected(connected) {
      $("#connect").prop("disabled", connected);
      $("#disconnect").prop("disabled", !connected);
      if (connected) {
          $("#conversation").show();
      } else {
          $("#conversation").hide();
      }
      $("#chatHistory").html("");
  }

  function connect() {
      var socket = new SockJS("http://localhost:8080/websocket"); // Connect to WebSocket
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

  function sendMessage() {
      console.log($("#userId1").val(), $("#message").val());
      stompClient.send("/send/chat", {}, JSON.stringify(
          {'userId1': $("#userId1").val(), 'message': $("#message").val()}));
      $("#message").val('');
  }

  function showMessage(response) {
      $("#chatHistory").append(
          "<tr><td>" + response.userId1 + ": " + response.message + "</td></tr>");
  }

  $(function () {
      $("form").on('submit', function (e) {
          e.preventDefault();
      });
      $("#connect").click(function () {
          connect();
      });
      $("#disconnect").click(function () {
          disconnect();
      });
      $("#send").click(function () {
          sendMessage();
      });
  });

  return (
      <BaseContainer>
          <div className="form-group">
              <label htmlFor="connect">WebSocket connection:</label>
              <button id="connect" type="submit">Connect</button>
              <button id="disconnect" type="submit" disabled="disabled">Disconnect
              </button>
          </div>
          <form className="form-inline">
              <div className="form-group">
                  <label htmlFor="name">UserId</label>
                  <input type="text" id="userId1" placeholder="Your id"></input>
              </div>
              <div className="form-group">
                  <label htmlFor="name">Message</label>
                  <input type="text" id="message" placeholder="Your Message"></input>
              </div>
              <button id="send" type="submit">Send</button>
          </form>
          <p>Conversation</p>
          <table id="conversation">
              <tbody id="chatHistory">
              </tbody>
          </table>
      </BaseContainer>
  );
};

export default Chat;
