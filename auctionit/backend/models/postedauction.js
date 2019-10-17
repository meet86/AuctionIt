const mongoose = require('mongoose');

const postedAuctionSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  initialBid: { type: Number, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  productType: { type: String, required: true },
  desc: { type: String, required: true },
  productName: { type: String, required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model('Postedauction', postedAuctionSchema);
