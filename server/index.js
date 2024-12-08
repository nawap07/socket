import express from "express"
import http from "http"
import { Server } from "socket.io";
import cors from "cors"

const app=express();
const server=http.createServer(app);
const io = new Server(server,{
      cors:{
        origin:"http://localhost:5173",
        methods:["GET,POST"],
        credentials:true
      }
})
app.get("/",(req,res)=>{
    res.send("Have a nice day")
})


io.on("connection",(socket)=>{
    console.log( "User connected ",socket.id);

    socket.emit("message","I Love you Pawan")
    socket.broadcast.emit("msg",`join the user with id -> ${socket.id}`)

    socket.on("data",({input,room})=>{
        console.log(input);
        console.log(room);
        socket.to(room).emit("friend",input)
        socket.emit("recive-messgae",input)
        // io.emit("recive-messgae",input)
        // socket.broadcast.emit("recive-messgae",input)
    })

    socket.on("join-room",(roomName)=>{
        socket.join(roomName)
    })
    socket.on("disconnect", ()=>{
        console.log("Socket is disconnected =>", socket.id );
        
    })
})


console.log("Good Evening Pawan");
server.listen(3000,()=>{
    console.log("Server is started.");
})