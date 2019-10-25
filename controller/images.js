const multer = require('multer');
const {sendUploadToGCS} = require('../lib/images');

const storage = multer({
  storage: multer.MemoryStorage,
  limits: {
    fileSize: 25 * 1024 * 1024, // no larger than 25mb
  },
});

exports.chargeImage = (req, res, next) => {
    const upload = storage.single('file');
    
    upload(req, res, function (err) { 
      console.log(req.file);

      sendUploadToGCS(req, res);
    });
};
