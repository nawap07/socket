import express from "express"
import http from "http"
import { Server } from "socket.io";

const port = 3000;
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
    console.log(`User is connected with ID - ${socket.id}`);

    io.emit("msg", "Good morning pawan")
    socket.broadcast.emit("hii", "I Love you Friends")

    socket.on("message", ({ value, user }) => {
        socket.emit("recive-message", value);
        socket.to(user).emit("users-message", value);
    })

    socket.on("join-room", (room) => {
        socket.join(room)
    })


    socket.on("disconnect", () => {
        console.log(`User is Disconnected with ID -${socket.id}`);
    })
})
app.get("/", (req, res) => {
    res.send("Good evening pawan ")
})

server.listen(port, () => {
    console.log(`Server is started at port : http://localhost:${port}`);
})