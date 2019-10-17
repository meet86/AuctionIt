const express = require('express');
const router = express.Router();
const Postedauction = require('../models/postedauction');
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];

    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext)
  }
});

router.post('/upload', multer({ storage: storage }).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const postauction = new Postedauction({
    firstname: req.body.first,
    lastname: req.body.last,
    initialBid: req.body.initialBid,
    phone: req.body.phone,
    email: req.body.email,
    productType: req.body.productType,
    desc: req.body.desc,
    productName: req.body.productName,
    imagePath: url + '/images/' + req.file.filename
  });
  postauction.save()
    .then(createdPost => {
      res.status(200).json({
        status: true, message: 'Auction added Successfully', post: {
          ...createdPost,
          postId: createdPost._id
        }
      })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ status: false, message: 'failed to save' });
    });
});

module.exports = router
