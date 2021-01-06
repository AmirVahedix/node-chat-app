const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
let {generateMessage} = require('./utlis/utlis')

const public_path = path.join(__dirname, '../public')
const PORT = process.env.PORT || 3000

let app = express()
let server = http.createServer(app)
let io = socketIO(server)


io.on('connection', (socket) => {
    console.log('new User Connected!')
    
    socket.emit('new_message', generateMessage('Admin', 'Welcome to our chat app!'))

    socket.broadcast.emit('new_message', generateMessage('Admin', 'New user joined to the chat.'))

    socket.on('create_message', (message) => {
        // io.emit('new_message', generateMessage('Admin', 'Welcome to our chat app!'))
        io.emit('new_message', generateMessage(message.from, message.body))
        // console.log(message.from, message.body)
    })

    socket.on('disonnect', () => {
        console.log('user was disconnected.')
    })
})

app.use(express.static(public_path))

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})