const express = require('express');
const router = express.Router();
const { Postedauction } = require('../models/user');
const { User } = require('../models/user');
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

router.post('/upload/:id', multer({ storage: storage }).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const paramId = req.params.id;
  let auctionId = "";
  const postauction = new Postedauction({
    _creator: paramId,
    initialBid: req.body.initialBid,
    productType: req.body.productType,
    desc: req.body.desc,
    productName: req.body.productName,
    imagePath: url + '/images/' + req.file.filename
  });
  postauction.save()
    .then(createdPost => {
      auctionId = createdPost._id;
      User.updateOne({ _id: paramId }, { $push: { postedAuctions: auctionId } }).exec();
      res.status(200).json({
        status: true, message: 'Auction added Successfully', post: {
          ...createdPost,
          auctionId: createdPost._id
        }
      })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ status: false, message: 'failed to save' });
    });
});

router.get('/:id', (req, res, next) => {
  console.log(req.params.id)
  Postedauction.find({ _creator: req.params.id })
    .then(docs => {
      console.log(docs);
      res.status(200).json({
        docs: docs
      });
    })
    .catch(error => {
      console.log('error');
      res.status(404).json({
        status: false, message: 'not found any entries'
      });
    });
});

router.put('/edit/:id', (req, res, next) => {
  console.log(req.params.id)
  Postedauction.updateOne({ _id: req.params.id }, {
    $set: {
      initialBid: req.body.initialBid,
      productType: req.body.productType, desc: req.body.desc
    }
  }).exec()
    .then(docs => {
      console.log(docs);
      res.status(201).json({ docs: docs, status: true })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'edit failed.' })
    })
})

module.exports = router
