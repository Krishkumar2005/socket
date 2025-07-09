import { useState, useEffect } from 'react'
import io from "socket.io-client"
import { nanoid } from "nanoid"
import './App.css'

// const socket = io(import.meta.env.SERVER_URL)
console.log(import.meta.env.VITE_SERVER_URL)
const socket = io.connect(import.meta.env.VITE_SERVER_URL)
const username = nanoid(4)

function App() {
  const [message, setMessage] = useState("")
  const [chats, setChats] = useState([])

  const sendChat = (e) => {
    console.log("inside senchat")
    e.preventDefault();
    socket.emit("chat", { message, username });
    setMessage("")
  }

  useEffect(() => {
    console.log("inside useeffect")
    socket.on("chat", (payload) => {
      setChats([...chats, payload])
    })

    // // Cleanup to avoid stacking listeners
    // return () => socket.off("chat", chatListener);
  }, [chats])

  console.log("chats ", chats)
  return (
    <>
      <h1>Chatty App</h1>
      {
        chats.map((payload, index) => {
          return (
            <p key={index}>{payload.message} :
              <span> id: {payload.username}</span></p>
          )
        })
      }


      <form onSubmit={sendChat}>
        <label htmlFor='chatInput'>Message</label>
        <input type="text" name="chat" id="chatInput"
          placeholder='send msg'
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }} />
        <button type='submit'>Send</button>
      </form>
    </>
  )
}

export default App
