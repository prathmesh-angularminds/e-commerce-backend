require('dotenv').config()
const cloudinary = require('cloudinary').v2;


// Configuring cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
    secure: true
})


const uploadMultipleFile = async(files) => {

    const imagePromise = []

    for(let file of files) {
        imagePromise.push(await cloudinary.uploader.upload(file.path))
    }

    return imagePromise;
}

module.exports.uploadMultipleFile = uploadMultipleFile