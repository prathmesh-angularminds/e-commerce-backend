const httpStatus = require('http-status');
const {File} = require('../models/index');
const ApiError = require('../utils/apiError');

const addFile = async (file) => {

    const newFile = await File.create(file);
    return newFile;
}

const addFiles = async (files) => {
    
    let fileIds = [];
    
    console.log(files);
    for(let file of files) {
        fileIds.push(await addSingleFile(file)._id);
    }


    return fileIds;
}

const deleteFileById = (fileId) => {

    const file = fileSchema.findById(fileId);

    if(!file) {
        throw new ApiError(httpStatus.NOT_FOUND,'File not found')
    }

    File.findByIdAndDelete(productId);
    return {code: httpStatus.OK,message: "File deleted successfully !!!"};
}

const deleteFilesById = (fileIds) => {

    for(let file of fileIds) {
        deleteFileById(file);
    }
}

module.exports = {
    addFile,
    addFiles,
    deleteFileById,
    deleteFilesById
}