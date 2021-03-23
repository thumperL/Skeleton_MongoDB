const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type    : String,
    required: true,
  },
  email: {
    type    : String,
    required: true,
  },
  password: {
    type    : String,
    required: true,
  },
  isAdmin: {
    type    : Boolean,
    required: true,
    default : false,
  },
  image: {
    type: String,
  },
  createdAt: {
    type   : Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('User', userSchema);
