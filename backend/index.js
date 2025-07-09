import express from "express";
import {createServer} from "http"
import {Server} from "socket.io"
const app = express()

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors:{
        origin: "*"
    }
})

io.on("connection", (socket)=>{
    console.log("What is socket : ", socket)
    console.log("Socket is actively to connected")

    socket.on("chat", (payload)=>{
        console.log("What is playload ", payload)
        io.emit("chat",payload)
    })

})

httpServer.listen("4500", ()=>{
    console.log("Server is listening at port 4500...")
})