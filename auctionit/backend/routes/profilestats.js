const express = require('express');
const router = express.Router();
const { Postedauction } = require('../models/user');
const { User } = require('../models/user');
const { Postedbids } = require('../models/user');
const arraySort = require('array-sort');
const mongoose = require('mongoose')

router.get('/list/:id', (req, res, next) => {
  console.log('UID: ' + req.params.id);
  var pids = []
  var d = []
  var response = []
  var sort = []
  var sorted = []
  Postedbids.find({ _creator: req.params.id }).populate('Postedauction.productName').exec()
    .then(docs => {
      console.log('msg', req.params.id)
      console.log(docs);
      d = []

      pids = []
      sort = []
      sorted = []
      docs.forEach(element => {
        pids.push(element._product)
        d.push(element.bids)
      });

      console.log(pids)

      Postedauction.find({ _id: { $in: pids } }).then(product => {
        console.log("Product details", product)
        response = []
        product.forEach((x, i) => {
          console.log('doc i', d[i])
          sort.push(docs[i].bids)
          response.push({ productData: x, extra: arraySort(docs[i].bids, { reverse: true }) })
        })
        console.log('Sorted arr:' + arraySort(sort, 'bid', { reverse: true }))
        console.log('Sort arr: ' + sort);
        console.log('final', response)
        res.status(200).json({ docs: response })
      })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'failed to get bids data' })
    })
})

// On End Auction
router.delete('/endauction/:pid/:uid', (req, res, next) => {

})

router.get('/sort/:id', (req, res, next) => {
  // Postedbids.findOne({ _product: req.params.id }, { _id: 0, bids: 1 }).sort({ bid: -1 })
  // Postedbids.aggregate([{ $group: { _id: "$bids._by", maxTotal: { $max: "$bids" } } }]).exec()
  Postedbids.findOne().where({ _product: req.params.id }).sort('-bids.bid').exec().then(doc => {
    var max = arraySort(doc.bids, 'bid', { reverse: true });
    console.log('MAXX: ', max[0])
    res.status(200).json({ max: max })
  })
  // .then(d => {
  //   console.log('gfsahgd', d)
  // })
  // Postedbids.aggregate([{ $unwind: "$bids" }, { $group: { _id: "$_id", max: { $max: "$bids.bid" } } }, { $project: { max: 1, _id: 0 } }])

  // .exec()
  // .then(docs => {
  //   console.log('from sort method: ' + JSON.stringify(docs))
  //   max = 0


  //   // console.log('max', max)
  //   res.status(200).send({ docs: docs })
  // })
  // .catch(error => {
  //   console.log(error);
  // })
})

module.exports = router
