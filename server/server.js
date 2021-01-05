const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const public_path = path.join(__dirname, '../public')
const PORT = process.env.PORT || 3000

let app = express()
let server = http.createServer(app)
let io = socketIO(server)

io.on('connection', (socket) => {
    console.log('new User Connected!')

    socket.on('disonnect', () => {
        console.log('user was disconnected.')
    })
})

app.use(express.static(public_path))




server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})