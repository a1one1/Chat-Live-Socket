import { useEffect, useRef, useState } from "react";
import socket from "../../socket";

function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const [message, setMessage] = useState("");

  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current.scrollTo(0, 999999);
  }, [messages]);

  const onSendMessage = () => {
    socket.emit("room newMessage", {
      userName,
      roomId,
      text: message,
    });
    onAddMessage({ userName, text: message });
    setMessage("");
  };

  return (
    <div
      className="chat"
      style={{ height: "80vh", display: "flex", margin: "50px auto" }}
    >
      <div
        className="chat-users"
        style={{
          width: "25%",
          height: "100%",
          backgroundColor: "LightCyan",
          padding: "20px",
        }}
      >
        <h3>Комната: {roomId}</h3>
        <hr />
        <b style={{ fontSize: "18px" }}>Онлайн ({users.length}):</b>
        <ul>
          {users.map((user, index) => {
            return (
              <li
                key={user + index}
                style={{
                  listStyleType: "none",
                  textAlign: "center",
                  padding: "5px 35px 5px 0",
                  marginTop: "10px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  boxShadow: "1px 1px 10px silver",
                }}
              >
                {user}
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className="chat-messages"
        style={{
          width: "75%",
          height: "100%",
          backgroundColor: "white",
          border: "5px solid LightCyan",
          padding: "40px",
        }}
      >
        <div className="messages" ref={messagesRef}>
          {messages.map((message, index) => {
            return (
              <div
                className="message"
                key={message + index}
                style={{ textAlign: "left" }}
              >
                <p
                  style={{
                    backgroundColor: "LightCyan",
                    borderRadius: "5px",
                    margin: "10px auto 0",
                    padding: "5px 10px",
                    width: "auto",
                    display: "inline-block",
                    alignItems: "left",
                  }}
                >
                  {message.text}
                </p>
                <div>
                  <span
                    style={{
                      paddingRight: "700px",
                      color: "silver",
                      fontSize: "12px",
                    }}
                  >
                    {message.userName}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <textarea
            style={{
              width: "100%",
              padding: "10px",
              outline: "none",
              marginTop: "20px",
            }}
            name=""
            id=""
            cols="30"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            onClick={onSendMessage}
            style={{ marginRight: "750px", color: "white" }}
            className="btn btn-info"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
