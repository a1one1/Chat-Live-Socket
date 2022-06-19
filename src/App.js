import JoinBlock from "./components/join-block/JoinBlock";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useReducer } from "react";
import reducer from "./reducer";
import socket from "./socket";
import Chat from "./components/chat/Chat";
import axios from "axios";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  async function onLogin(object) {
    dispatch({
      type: "JOINED",
      payload: object,
    });
    socket.emit("room join", object);
    const { data } = await axios.get(`/rooms/${object.roomId}`);
    dispatch({
      type: "setData",
      payload: data,
    });
  }

  function addMessage(message) {
    dispatch({
      type: "newMessages",
      payload: message,
    });
  }

  function setUsers(users) {
    dispatch({ type: "setUsers", payload: users });
  }

  useEffect(() => {
    console.log(2);
    socket.on("room setUser", setUsers);
    socket.on("room newMessage", addMessage);
  }, []);

  window.socket = socket;

  return (
    <div className="wrapper">
      {!state.joined ? (
        <JoinBlock onLogin={onLogin} />
      ) : (
        <Chat {...state} onAddMessage={addMessage} />
      )}
    </div>
  );
}

export default App;
