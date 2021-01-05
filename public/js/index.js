let socket = io()

socket.on('connect', () => {
    console.log('connected to server!')

    socket.emit('responseEmail', {
        from: 'nobody@gmail.com',
        to: "amirvahedix@gmail.com",
        body: "response back to amirvahedix",
        created_at: new Date()
    })

})

socket.on('disconnect', () => {
    console.log('disconnected from server')
})

socket.on('newEmail', (email) => {
    console.log(email)
})