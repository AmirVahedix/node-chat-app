let socket = io()

let scrollDown = () => {
    //Selector
    let messages = jQuery('#messages')
    let newMessage = messages.children('li:last-child')

    //Height
    let clientHeight = messages.prop('clientHeight')
    let scrollTop = messages.prop('scrollTop')
    let scrollHeight = messages.prop('scrollHeight')

    let newMessageHeight = newMessage.innerHeight()
    let lastMessageHeight = newMessage.prev().innerHeight()

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', () => {
    console.log('connected to server!')
    let params = jQuery.deparam(window.location.search)

    socket.emit('join', params, (err) => {
        if(err) {
            alert(err)
            window.location.href = '/'
        }else{
            console.log('OK!')
        }
    })
})

// new Message
socket.on('new_message', (message) => {
    let formatedTime = moment(message.created_at).format('hh mm a')
    let template = jQuery('#message-template').html()
    let html = Mustache.render(template, {
        from: message.from,
        body: message.body,
        formatedTime: formatedTime
    })

    jQuery('#messages').append(html)

    scrollDown()
})

// New Location Message
socket.on('create_locatoin_message', (location) => {
    let formatedTime = moment(location.created_at).format('hh mm a')

    let template = jQuery('#location-message-template').html()
    let html = Mustache.render(template, {
        from: location.from,
        url: location.url,
        formatedTime: formatedTime
    })

    jQuery('#messages').append(html)
    scrollDown()

})

socket.on('disconnect', () => {
    console.log('disconnected from server')
})

jQuery('#message-form').on('submit', function(e){
    e.preventDefault()
    let params = jQuery.deparam(window.location.search)

    socket.emit('create_message', {
        from: params.name,
        body: jQuery('[name=message]').val(),
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
    let params = jQuery.deparam(window.location.search)
            socket.emit('location_message', {
            from: params.name,
            lat: position.coords.latitude,
            long: position.coords.longitude,
        })
    }, () => {
        console.log('unable to fetch location')
    })
})

socket.on('updateUsersList', (users) => {
    let ol = jQuery('<ol></ol>')
    users.forEach((user) => {
        ol.append(jQuery('<li></li>').text(user))
    })
    jQuery('#users').html(ol)
})