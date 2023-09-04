const objectId = (value,helpers) => {
    
    if(!value.match(/^[0-9a-fA-F]{24}$/)) {
        helpers.message('"{{#label}} must be a valid mongo id"')
    }

    return value; 
}


module.exports = {
    objectId
}