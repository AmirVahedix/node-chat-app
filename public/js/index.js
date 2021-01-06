let socket = io()

socket.on('connect', () => {
    console.log('connected to server!')
})

socket.on('new_message', (message) => {
    console.log(message.body)
    let li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.body}`)
    jQuery('#messages').append(li)
})

socket.on('disconnect', () => {
    console.log('disconnected from server')
})

jQuery('#message-form').on('submit', function(e){
    e.preventDefault()
    socket.emit('create_message', {
        from: 'User',
        body: jQuery('[name=message]').val()
    })
})