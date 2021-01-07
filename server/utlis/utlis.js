const moment = require('moment')

let generateMessage = (from, body) => {
    return{
        from, 
        body,
        created_at: moment().valueOf()
    }
}

let generateLocationMessage = (from, lat, long) => {
    return{
        from,
        url: `https://www.google.com/maps/search/${lat},${long}`,
        created_at: moment().valueOf()
    }
}

module.exports = {generateMessage, generateLocationMessage}