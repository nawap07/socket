import express from "express"
import http from "http"
import { Server } from "socket.io";

const port = 3000;
const app = express();
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
})

io.on("connection", (socket) => {
    console.log("User Connected ID --", socket.id);
    // socket.emit("msg","Have a nice night");
    // socket.broadcast.emit("msg","Have a nice night");
    socket.broadcast.emit("msg", `user connected with ${socket.id}`);

    socket.on("message", ({ input, room }) => {
        socket.emit("recive-message", input)
        socket.to(room).emit("friend",input)
    })

    socket.on("join-room",(roomName)=>{
        socket.join(roomName);
    })





    socket.on("diconnect", () => {
        console.log("User disconnected ID --", socket.id);

    })
})

app.get("/", (req, res) => {
    res.send("Good Night Pawan")
})

server.listen(port, () => console.log(`Server is started at PORT :- http://localhost:${port}`))