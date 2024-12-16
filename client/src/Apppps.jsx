import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"


const Apppps = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketId, setSocketId] = useState("");
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");

  const handleMessages = (e) => {
    e.preventDefault();
    socket.emit("message", { value, user });
    setValue("");

  }

  const handleRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room",room)
    setRoom("");
  }

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);

      socket.on("recive-message", (data) => {
        setMessages((prev) => [...prev, data])
      })
      socket.on("users-message", (data) => {
        setMessages((prev) => [...prev, data])
      })







    })

    return () => {
      socket.disconnect();
    }
  }, [])
  return (
    <div>
      <div className="">
        <h1>ChatWithMe</h1>
        <h2>{socketId}</h2>
        <div className="">
          <form onSubmit={handleRoom}>
            <input type="text" placeholder='Join Room' value={room} onChange={(e) => setRoom(e.target.value)} />
            <button>Join</button>
          </form>
        </div>
        <form onSubmit={handleMessages}>
          <input type="text" placeholder='Message...' value={value} onChange={(e) => setValue(e.target.value)} />
          <input type="text" placeholder='User ID' value={user} onChange={(e) => setUser(e.target.value)} />
          <button>Send</button>
        </form>
        <div className="">
          {
            messages.map((m, i) => (
              <div className="" key={i}>
                <h2>{m}</h2>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Apppps