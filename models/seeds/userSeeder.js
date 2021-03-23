if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const bcrypt = require('bcryptjs');
const User = require('../user');
const db = require('../../config/mongoose');

// Dummy Data
const seedUsers = [
  {
    name    : 'root',
    email   : 'root@example.com',
    password: '12345678',
    isAdmin : true,
    image   : `https://loremflickr.com/300/300/portrait/?lock=${Math.random() * 100}`,
  },
  {
    name    : 'user11',
    email   : 'user11@example.com',
    password: '12345678',
    isAdmin : false,
    image   : `https://loremflickr.com/300/300/portrait/?lock=${Math.random() * 100}`,
  },
  {
    name    : 'user21',
    email   : 'user21@example.com',
    password: '12345678',
    isAdmin : false,
    image   : `https://loremflickr.com/300/300/portrait/?lock=${Math.random() * 100}`,
  },
];

const usersPromise = [];
seedUsers.forEach((user) => {
  usersPromise.push(
    new Promise((resolve, reject) => {
      bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(user.password, salt))
      .then((hash) => User.create({
        name    : user.name,
        email   : user.email,
        password: hash,
        isAdmin : user.isAdmin,
        image   : user.image,
      }))
      .then((user) => resolve(user))
      .catch((error) => reject(console.error(error)));
    }),
  );
});

db.once('open', () => {
  (async () => {
    Promise.all(usersPromise)
    .then(() => {
      console.log('User seeder completed.');
      process.exit();
    });
  })()
  .catch((error) => console.error(error));
});
