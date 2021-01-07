let generateMessage = (from, body) => {
    return{
        from, 
        body,
        created_at: new Date() 
    }
}

let generateLocationMessage = (from, lat, long) => {
    return{
        from,
        url: `https://www.google.com/maps/search/${lat},${long}`,
        created_at: new Date()
    }
}

module.exports = {generateMessage, generateLocationMessage}