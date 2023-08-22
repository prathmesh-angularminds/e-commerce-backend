const mongoose = require('mongoose');

const stringType = {
    type: String,
    require: true
}

const numberType = {
    type: Number,
    require: true
}

const fileSchema = new mongoose.Schema({
    asset_id: stringType,
    public_id: stringType,
    version: numberType,
    version_id: stringType,
    signature: stringType,
    format: stringType,
    resource_type: stringType,
    created_at: stringType,
    bytes: numberType,
    type: stringType,
    etag: stringType,
    url: stringType,
    secure_url: stringType,
    original_filename: stringType,
    api_key: stringType
})

const File = mongoose.model('file',fileSchema);

module.exports = File