const multer = require("multer");
const path = require("path");
const fs = require("fs");

const getStorage = (folderName) => {
  const uploadPath = path.join(__dirname, `../uploads/${folderName}`);
  fs.mkdirSync(uploadPath, { recursive: true });

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
};

const upload = (folderName) =>
  multer({
    storage: getStorage(folderName),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) return cb(null, true);
      cb("Only image files are allowed!");
    },
  });

module.exports = upload;
