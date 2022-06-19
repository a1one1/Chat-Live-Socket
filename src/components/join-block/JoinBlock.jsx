import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";

function JoinBlock({ onLogin }) {
  const [roomId, setRoomId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  async function onEnter() {
    if (!roomId || !userName) {
      return alert("Неверные данные");
    }
    const object = {
      roomId,
      userName,
    };
    setIsLoading(true);
    await axios.post("/rooms", object);
    onLogin(object);
  }

  return (
    <div className="row" style={{ width: "700px", margin: "auto" }}>
      <div className="row" style={{ margin: "0px auto 15px" }}>
        {" "}
        <input
          className="form-control"
          type="text"
          name=""
          id=""
          onChange={(e) => setRoomId(e.target.value)}
          value={roomId}
          placeholder="RoomID"
          style={{ width: "300px", margin: "auto", height: "50px" }}
        />
      </div>

      <div className="row" style={{ margin: "0px auto 15px" }}>
        <input
          className="form-control"
          type="text"
          name=""
          id=""
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          placeholder="User"
          style={{ width: "300px", margin: "auto", height: "50px" }}
        />
      </div>

      <Button
        style={{ width: "300px", margin: "auto", height: "50px" }}
        onClick={onEnter}
        variant="outline-info"
        disabled={isLoading}
      >
        {isLoading ? "Вход.." : "Войти"}
      </Button>
    </div>
  );
}

export default JoinBlock;
