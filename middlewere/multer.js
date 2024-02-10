const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") && file.mimetype !== "image/gif") {
    cb(null, true);
  } else {
    cb(new Error("Only images (excluding GIF) are allowed"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
