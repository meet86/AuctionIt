const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: Number, required: true, unique: true }
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
