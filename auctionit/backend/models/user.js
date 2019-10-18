const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: Number, required: true, unique: true },
  postedAuctions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Postedauction', required: false }]
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
  // dueDate: {type: Date, required: true}
});

const Postedauction = mongoose.model('Postedauction', postedAuctionSchema);

module.exports = { User: User, Postedauction: Postedauction }
