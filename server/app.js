import express from "express";
import http from "http"
import { Server } from "socket.io";

const PORT = 3000;
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
})

io.on("connection", (socket) => {
    console.log(`User is connected - ${socket.id}`);

    io.emit("msg", "Good Evening pawan mahato");

    socket.on("message", ({ value, user }) => {
        socket.emit("recive-message", value);
        socket.to(user).emit("joinUser", value);
    })

    socket.on("join-room", (room) => {
        socket.join(room)
    })



    socket.on("disconnect", () => {
        console.log(`User Disconnected ID -${socket.id}`);
    })

})

app.get("/", (req, res) => {
    res.send("Good Evening pawan")
})

server.listen(PORT, () => {
    console.log(`Server is started at PORT : http://localhost:${PORT}`);
})