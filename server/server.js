const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
let {generateMessage, generateLocationMessage} = require('./utlis/utlis')
let {isString} = require('./utlis/validation')

const public_path = path.join(__dirname, '../public')
const PORT = process.env.PORT || 3000

let app = express()
let server = http.createServer(app)
let io = socketIO(server)

io.on('connection', (socket) => {
    console.log('new User Connected!')
    
    socket.on('join', (params, callback) => {
        if(!isString(params.name) || !isString(params.room)){
            callback('Name and Room name must be valid')
        }
        socket.join(params.room)
        socket.emit('new_message', generateMessage('Admin', 'Welcome to our chat app!'))
        socket.broadcast.to(params.room).emit('new_message', generateMessage('Admin', `${params.name} joined the chat`))
        callback()
    })

    socket.on('create_message', (message) => {
        io.emit('new_message', generateMessage(message.from, message.body))
    })

    socket.on('location_message', (coords) => {
        io.emit('create_locatoin_message', generateLocationMessage(coords.from, coords.lat, coords.long))
    })

    socket.on('disonnect', () => { 
        console.log('user was disconnected.')
    })
})



app.use(express.static(public_path))

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})