let socket = io()

socket.on('connect', () => {
    console.log('connected to server!')
})

socket.on('new_message', (message) => {
    console.log(message.body)
})

socket.on('disconnect', () => {
    console.log('disconnected from server')
})
