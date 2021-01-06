let generateMessage = (from, body) => {
    return{
        from, 
        body,
        created_at: new Date() 
    }
}

module.exports = {generateMessage}