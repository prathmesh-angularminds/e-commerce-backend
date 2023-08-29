require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const ApiError = require('./apiError');
const httpStatus = require('http-status');


// Configuring cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
    secure: true
})


const uploadFile = async (file) => await cloudinary.uploader.upload(file.path)


const uploadMultipleFile = async(files) => {

    const imagePromise = []

    for(let file of files) {

        imagePromise.push(await uploadFile(file))
        // delete file after uploading it.
        fs.unlink(file.path, (err) => {
            // If error occurs while deleting file
            if(err) {
                throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Error occurred uploading file")
            }
        })
    }

    return imagePromise;
}

const deleteFile = async(publicId) => await cloudinary.uploader.destroy(publicId);

const deleteMultipleFile = async(publicIdArray) => {

    for(let id of publicIdArray) {
        deleteFile(id);
    }


}

module.exports = {
    uploadFile,
    uploadMultipleFile,
    deleteFile,
    deleteMultipleFile
}