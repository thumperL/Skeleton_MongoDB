const mongoose = require('mongoose');

const { Schema } = mongoose;
const restaurantSchema = new Schema({
  name: {
    type    : String,
    required: true,
  },
  name_en: {
    type    : String,
    required: true,
  },
  category: {
    type    : String,
    required: true,
  },
  image: {
    type    : String,
    required: true,
  },
  location: {
    type    : String,
    required: true,
  },
  phone: {
    type    : String,
    required: false,
  },
  google_map: {
    type    : String,
    required: false,
  },
  rating: {
    type    : Number,
    required: false,
  },
  description: {
    type    : String,
    required: false,
  },
  userId: {
    type    : Schema.Types.ObjectId,
    ref     : 'User',
    index   : true,
    required: true,
  },
});
module.exports = mongoose.model('restaurant', restaurantSchema);
