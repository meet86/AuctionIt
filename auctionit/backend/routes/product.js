const express = require('express');
const router = express.Router();
const { Postedauction } = require('../models/user');
const { Postedbids } = require('../models/user');

router.get('/detail/:id', (req, res, next) => {
  Postedauction.findOne({ _id: req.params.id }).exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json({ docs: docs })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'failed' })
    })
})



router.post('/post/:pid/:uid', (req, res, next) => {
  console.log('Prodid: ' + req.params.pid);
  console.log('UID: ' + req.params.uid);
  console.log('bid: ' + req.body.bid);
  const dataToPush = { _by: req.params.uid, bid: req.body.bid };
  Postedbids.updateOne({ _product: req.params.pid }, {
    $push: { bids: dataToPush }
  }, { new: true }
  ).then(docs => {
    console.log(docs);
    res.status(200).json({ docs: docs, status: true })
  }).catch(error => {
    console.log(error)
    res.status(500).json({ message: 'failed to update bidmodel' })
  })
})




module.exports = router;
