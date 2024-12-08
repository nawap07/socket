import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"

const Apps = () => {

    const socket = useMemo(() => io("http://localhost:3000"), []);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [room, setRoom] = useState("");
    const [roomName, setRoomName] = useState("");
    const [socketId, setSocketId] = useState("");

    const handleMessageSend = (e) => {
        e.preventDefault();
        socket.emit("message", { input, room });
        setInput("");
    }

    const handleJoinRoom =(e)=>{
        e.preventDefault();
        socket.emit("join-room",roomName);
        setRoomName("");
        alert("join room")
    }
    useEffect(() => {
        socket.on("connect", () => {
            setSocketId(socket.id)
            console.log("User is Connected", socket.id);

            socket.on("recive-message", (msg) => {
                setMessages((prev) => [...prev, msg])

            })

            socket.on("friend", (msg) => {
                setMessages((prev) => [...prev, msg])
            })

            socket.on("msg", (msg) => {
                console.log(msg);

            })


            return () => socket.disconnect();
        })


    }, [])
    return (
        <div>
            <h1>Chat With Me</h1>
            <h2 className='p-4 bg-gray-500 text-white text-5xl'>{socketId}</h2>
            <form onSubmit={handleJoinRoom}>
                <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder='Join Room' className='border outline-none p-4 m-2 rounded-2xl' />
                <button className='border outline-none px-5 py-3 text-white m-2 rounded-2xl bg-blue-400 hover:bg-blue-600 '>Join</button>
            </form>
            <form onSubmit={handleMessageSend}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Write a message' className='border outline-none p-4 m-2 rounded-2xl' />
                <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} placeholder='User Id' className='border outline-none p-4 m-2 rounded-2xl' />
                <button className='border outline-none px-5 py-3 text-white m-2 rounded-2xl bg-blue-400 hover:bg-blue-600 '>Send</button>
            </form>
            <div className="">
                {
                    messages.map((message, index) => (
                        <div className="" key={index}>
                            <h2>{message}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Apps