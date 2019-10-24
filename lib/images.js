'use strict';

// Imports the Google Cloud client library.
const {Storage} = require('@google-cloud/storage');
const googleConf = require('../config/google.js');

const cloudBucket = googleConf.cloudStorage.cloudBucket;

const storage = new Storage();
const bucket = storage.bucket(cloudBucket);

/**
 * Returns the public, anonymously accessable URL to a given Cloud Storage objet
 * The object's ACL has to be set to public read.
 * @param {string} filename name of file in cloud storage
 */
function getPublicUrl(filename) {
    return `https://storage.googleapis.com/${cloudBucket}/${filename}`;
}

// Express middleware that will automatically pass uploads to Cloud Storage.
// req.file is processed and will have two new properties:
function sendUploadToGCS(req, res, next) {
    if (!req.file) {
      return;
    }

    const gcsname = Date.now() + req.file.originalname;
    const file = bucket.file(gcsname);
  
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
      resumable: false,
    });
  
    stream.on('error', err => {
      req.file.cloudStorageError = err;
      return res.status(400).send({error: err.message});
    });
  
    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        file.makePublic().then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
            res.status(201).send({message: 'Imagen subida'});
        });
    });
  
    stream.end(req.file.buffer);
}

module.exports = {
    getPublicUrl,
    sendUploadToGCS,
};
