let socket = io()

socket.on('connect', () => {
    console.log('connected to server!')
})

socket.on('new_message', (message) => {
    let formatedTime = moment(message.created_at).format('hh mm a')
    let template = jQuery('#message-template').html()
    let html = Mustache.render(template, {
        from: message.from,
        body: message.body,
        formatedTime: formatedTime
    })

    jQuery('#messages').append(html)
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
    let formatedTime = moment(location.created_at).format('hh mm a')

    let template = jQuery('#location-message-template').html()
    let html = Mustache.render(template, {
        from: location.from,
        url: location.url,
        formatedTime: formatedTime
    })

    jQuery('#messages').append(html)
})