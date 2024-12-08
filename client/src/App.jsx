import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const[room,setRoom]=useState("");
  const[socketId,setSocketId]=useState("");
  const[roomName,setRoomName]=useState("");

  

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id)
      console.log("User Connected", socket.id);

      socket.on("message", (msg) => {
        console.log(msg, socket.id);

      })

      socket.on("msg", (msg) => {
        console.log(msg, socket.id);
      })

      socket.on("recive-messgae", (msg) => {
        setMessages((prev) => [...prev, msg])
        console.log(msg);
      })
      socket.on("friend",(msg)=>{
        setMessages((prev)=>[...prev,msg])
        
      })
      return () => {
        socket.disconnect();
      }

    })
  }, [])

  const sandMessage = (e) => {
    e.preventDefault();
    socket.emit("data", {input,room});
    setInput("");
  }

  const joinRoomHandler=(e)=>{
    e.preventDefault();
    socket.emit("join-room",roomName);
    setRoomName("");
  }
  return (
    <div>
      <h1 className='text-center mt-5 bg-gray-300 p-6 text-5xl text-blue-800'>ChatApp</h1>
      <h3 className='bg-blue-100 text-3xl p-3'> my socket ID == {">???  "}{socketId}</h3>
      <form onSubmit={joinRoomHandler}>
      <input type="text" placeholder='Join Room' className='border p-2 outline-none m-3' value={roomName} onChange={(e) => setRoomName(e.target.value)} />
      <button className='outline-none border p-4'>Join</button>
      </form>
      <form onSubmit={sandMessage}>
        <input type="text" placeholder='Send a message...' className='border p-2 outline-none m-3' value={input} onChange={(e) => setInput(e.target.value)} />
        <input type="text" placeholder=' Enter Room ID' className='border p-2 outline-none m-3' value={room} onChange={(e) => setRoom(e.target.value)} />
        <button className='bg-blue-800 rounded-2xl px-5 py-4 ml-1 text-white'>Send</button>
      </form>
      <div className="">
        {
          messages.map((message, index) => (
            <div className="" key={index}>
              <h1>{message}</h1>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App