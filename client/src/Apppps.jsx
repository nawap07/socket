import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"

const Apppps = () => {
    const socket = useMemo(() => io("http://localhost:3000"), []);
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");
    const [user, setUser] = useState("");
    const [userId, setUserId] = useState("");
    const [room, setRoom] = useState("");

    const handleJoinRoom = (e) => {
        e.preventDefault();
        socket.emit("join-room",room)

        setRoom("")

    }
    const handleMessages = (e) => {
        e.preventDefault();
        socket.emit("message", { value, user });
        setValue("")
    }

    useEffect(() => {
        socket.on("connect", () => {
            setUserId(socket.id)
            console.log(`User Connected ID - ${socket.id}`);

            socket.on("msg", (msg) => {
                console.log(msg);

            })

            socket.on("recive-message", (msg) => {
                setMessages((prev) => [...prev, msg]);
            })

            socket.on("joinUser", (msg) => {
                setMessages((prev) => [...prev, msg])
            })
        })


        return () => socket.disconnect();
    }, [])
    return (
        <div>
            <div className="">
                <h2 className='bg-red-200 text-white p-4 text-center text-5xl'>Chat With your Loved Once</h2>
                <h4 className='bg-gray-400 text-white text-3xl text-end p-4'> USER ID - {" "}{userId}</h4>
                <div className="">
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder='Join Room'
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            className='outline-none border p-3 m-2 rounded-xl'
                        />
                        <button className='outline-none bg-blue-300 text-xl text-white px-6 py-3 m-2 rounded-2xl'>Join Room</button>

                    </form>
                </div>
                <form onSubmit={handleMessages}>
                    <input
                        type="text"
                        placeholder='Type message ...'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className='outline-none border p-3 m-2 rounded-xl'
                    />
                    <input
                        type="text"
                        placeholder='User Id'
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className='outline-none border p-3 m-2 rounded-xl'
                    />
                    <button className='outline-none bg-blue-300 text-xl text-white px-6 py-3 m-2 rounded-2xl'>Send</button>
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
        </div>
    )
}

export default Apppps