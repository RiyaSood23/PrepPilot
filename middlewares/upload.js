const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = process.env.VERCEL
  ? path.join("/tmp", "uploads")
  : path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
  } catch (error) {
    if (process.env.VERCEL) {
      console.warn('Upload directory is not writable in Vercel, using /tmp/uploads');
    } else {
      throw error;
    }
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF/DOC/DOCX allowed"));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter
});

module.exports = upload;