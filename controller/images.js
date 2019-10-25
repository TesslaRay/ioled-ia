const multer = require('multer');
const {sendUploadToGCS, getPublicUrl} = require('../lib/images');

const storage = multer({
  storage: multer.MemoryStorage,
  limits: {
    fileSize: 25 * 1024 * 1024, // no larger than 25mb
  },
});

exports.chargeImage = async (req, res, next) => {
    const upload = storage.single('file');
    await upload(req, res, async function (err) { 
      await sendUploadToGCS(req, res);
    });
};
