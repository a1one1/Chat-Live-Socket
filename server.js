const express = require("express");

const app = express();
const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());

const rooms = new Map();

app.get("/rooms/:id", (req, responce) => {
  const roomId = req.params.id;
  const object = rooms.has(roomId)
    ? {
        users: [...rooms.get(roomId).get("users").values()],
        messages: [...rooms.get(roomId).get("messages").values()],
      }
    : { users: [], messages: [] };
  responce.json(object);
});

app.post("/rooms", (req, responce) => {
  const { roomId, userName } = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );
  }
  responce.json([...rooms.values()]);
});

io.on("connection", (socket) => {
  socket.on("room join", ({ roomId, userName }) => {
    socket.join(roomId);
    rooms.get(roomId).get("users").set(socket.id, userName);
    const users = [...rooms.get(roomId).get("users").values()];
    socket.to(roomId).emit("room setUser", users);
  });

  socket.on("room newMessage", ({ roomId, userName, text }) => {
    const object = {
      userName,
      text,
    };
    rooms.get(roomId).get("messages").push(object);
    socket.to(roomId).emit("room newMessage", object);
  });

  socket.on("disconnect", () => {
    rooms.forEach((value, roomId) => {
      if (value.get("users").delete(socket.id)) {
        const users = [...value.get("users").values()];
        socket.to(roomId).emit("room setUser", users);
      }
    });
  });
  console.log("user connect", socket.id);
});

httpServer.listen(3370, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("server start!");
});
