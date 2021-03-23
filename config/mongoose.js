const mongoose = require('mongoose');

mongoose
.connect(
  process.env.MONGODB_URI,
  {
    useCreateIndex    : true,
    useNewUrlParser   : true,
    useUnifiedTopology: true,
  },
)
.then(() => {
  console.log('MongoDB Connected!');
})
.catch((error) => {
  console.error('MongoDB Connection ERROR!', error);
});
const db = mongoose.connection;

module.exports = db;
