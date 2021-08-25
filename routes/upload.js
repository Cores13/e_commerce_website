const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");

// Upload image on Cloudinary
// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload image
router.post("/upload", auth, authAdmin, (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "No files were uploaded." });
    }
    const file = req.files.file;

    if (file.size > 1024 * 1024) {
      //1024 * 1024 = 1MB
      removeTmp(file.tempFilePath);
      return res
        .status(400)
        .json({ msg: "File is too large. It has to be less than 1MB." });
    }

    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg"
    ) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File format is not supported." });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "ribosport" },
      async (error, result) => {
        if (error) {
          removeTmp(file.tempFilePath);
          throw error;
        }

        removeTmp(file.tempFilePath);
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Delete image
router.post("/destroy", auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "No image selected." });
    }

    cloudinary.v2.uploader.destroy(public_id, async (error, result) => {
      if (error) throw error;

      res.json({ msg: "Image deleted successfully." });
      // removeTmp(file.tempFilePath);
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

const removeTmp = (path) => {
  fs.unlink(path, (error) => {
    if (error) throw error;
  });
};

module.exports = router;
