let socket = io()

socket.on('connect', () => {
    console.log('connected to server!')
})

socket.on('new_message', (message) => {
    let li = jQuery('<li></li>')
    li.text(`${message.body}`)
    let span = jQuery('<span><span>')
    span.text(`${message.from}`)
    li.prepend(span)
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
    jQuery('[name=message]').val("")
})

let locationButton = jQuery('#send-location')

locationButton.on('click', () => {
    if(!navigator.geolocation){
        return alert('Location is not supported by your browser')
    }
    locationButton.attr('disabled', 'disabled').text('Sending Location...')

    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr('disabled').text('Send Location')
        socket.emit('location_message', {
            from: 'User',
            lat: position.coords.latitude,
            long: position.coords.longitude
        })
    }, () => {
        console.log('unable to fetch location')
    })
})

socket.on('create_locatoin_message', (location) => {
    let li = jQuery('<li></li>')
    let a = jQuery('<a target="_blank">My Current Location</a>')
    li.text(`${location.from}: `)
    a.attr('href', location.url)
    li.append(a)
    jQuery('#messages').append(li)
})