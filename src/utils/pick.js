
/**
 * This function returns a new object of specified keys passed
 * @param {object} object 
 * @param {*} keys 
 * @returns 
 */
const pick = (object, keys) => {

    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key]
        }
        return obj
    }, {})
}

module.exports = pick