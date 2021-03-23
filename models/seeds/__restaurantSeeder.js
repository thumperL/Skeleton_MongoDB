const bcrypt = require('bcryptjs');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const restaurant = require('../restaurant');
const User = require('../user');
const db = require('../../config/mongoose');

// Dummy Data
const seedUsers = [
  {
    name    : 'Sample User 1',
    email   : 'user1@example.com',
    password: '12345678',
  },
  {
    name    : 'Sample User 2',
    email   : 'user2@example.com',
    password: '12345678',
  },
];
const restaurantList = require('./restaurantSeeds.json');

db.once('open', () => {
  seedUsers.forEach((eaSeedUser, index) => {
    bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(eaSeedUser.password, salt))
    .then((hash) => User.create({
      name    : eaSeedUser.name,
      email   : eaSeedUser.email,
      password: hash,
    }))
    .then((user) => {
      const userId = user._id;
      return Promise.all(
        Array.from(
          { length: 3 },
          (_, i) => restaurant.create(
            { ...restaurantList.results[(i + (index * 3))], userId },
          ),
        ),
      );
    })
    .then(() => {
      console.log('Seeder Import Completed.');
      process.exit();
    });
  });
});
