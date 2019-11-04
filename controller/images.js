const multer = require('multer');
const fs = require('fs');

const {sendUploadToGCS} = require('../lib/images');
const {predictWithImage} = require('../services/googleAutoML');

const temporalStorage = multer({

  storage: multer.MemoryStorage,
  limits: {
    fileSize: 25 * 1024 * 1024, // no larger than 25mb
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './resources')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

exports.chargeImage = async (req, res) => {
    const upload = temporalStorage.single('file');
    const saveImage = multer({ storage: storage }).single('file')

    await saveImage(req, res, async function () {  
      predict = await predictWithImage(req.file.path);
      fs.unlinkSync(req.file.path);
    });
    
    await upload(req, res, async function (err) { 
      await sendUploadToGCS(req, res);
    });
};
