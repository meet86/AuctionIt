const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: Number, required: true, unique: true },
  postedAuctions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Postedauction', required: false }],
  postedBids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Postedbids', require: false }]
});
userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);

const postedAuctionSchema = mongoose.Schema({
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  initialBid: { type: Number, required: true },
  productType: { type: String, required: true },
  desc: { type: String, required: true },
  productName: { type: String, required: true },
  imagePath: { type: String, required: true },
  dueDate: { type: Date, required: true }
  // dueDate: {type: Date, required: true}
});

const Postedauction = mongoose.model('Postedauction', postedAuctionSchema);

const bidSchema = mongoose.Schema({
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _product: { type: mongoose.Schema.Types.ObjectId, ref: 'Postedauction' },
  bids: [{
    _by: { type: mongoose.Schema.Types.String, ref: 'User' },
    bid: { type: Number, required: true }
  }]
});

const endedAuctionSchema = mongoose.Schema({
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _product: { type: mongoose.Schema.Types.ObjectId, ref: 'Postedauction' },
  winner: { type: String, required: true },
  priceValue: { type: String, required: true }
})

const EndedAuction = mongoose.model('EndedAuction', endedAuctionSchema)

const Postedbids = mongoose.model('Postedbids', bidSchema);

module.exports = { User: User, Postedauction: Postedauction, Postedbids: Postedbids, EndedAuction: EndedAuction }
