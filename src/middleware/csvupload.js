const multer = require("multer");

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml") || file.mimetype.includes("csv")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;