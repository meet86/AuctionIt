const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        fullname: req.body.fullname,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created',
            result: result,
            isSucceed: true
          });

        })
        .catch(err => {
          res.status(500).json({
            error: err,
            isSucceed: false
          });
        });
    });

});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      console.log(user.toJSON());
      if (!user) {
        return res.status(401).json({
          message: 'Auth Failed, Email Not found.'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      console.log(result);
      if (!result) {
        return res.status(401).json({ message: 'Incorrect password, Please try again.' });
      }
      const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
        'this_is_secret_string_lol_rofl', { expiresIn: '1h' });
      res.status(200).json({ token: token, status: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ status: false });
    });
});

module.exports = router;
