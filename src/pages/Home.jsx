import React from "react";
import "../styles/home.css";
import logo from "../assets/logo.svg";
import ScrollableFeed from "react-scrollable-feed";
import send from "../assets/send.webp";
import logout from "../assets/logout5.png";

const Home = ({
  user,
  logoutHandler,
  sendHandler,
  message,
  setMessage,
  messages,
  setMessages,
}) => {
  return (
    <div className="home">
      <div className="chat-room">
        <div className="header">
          <img className="logo" src={logo} alt="logo" />
          <span>Chat Room</span>
          <img
            className="logout"
            onClick={logoutHandler}
            src={logout}
            alt="logout"
          />
        </div>

        <div className="messages">
          <ScrollableFeed className="scrollbar">
            {messages.map((item) => {
              return item.uid === user.uid ? (
                <div key={item.id} className="outgoing">
                  <img src={item.url} alt="user" />
                  <p>{item.text}</p>
                </div>
              ) : (
                <div key={item.id} className="incoming">
                  <img src={item.url} alt="user" />
                  <p>{item.text}</p>
                </div>
              );
            })}
          </ScrollableFeed>
        </div>

        <div className="input-field">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type here"
          />
          <img onClick={sendHandler} src={send} alt="send" />
        </div>
      </div>
    </div>
  );
};

export default Home;
