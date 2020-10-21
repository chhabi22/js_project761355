//const auth = require('http-auth');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Registration = mongoose.model('Registration');
// const basic = auth.basic({
//   file: path.join(__dirname, '../users.htpasswd'),
// });

router.get('/', (req, res) => {
  res.render('form', { title: 'Registration form' });
});

router.post('/',
  [
    check('name')
      .isLength({ min: 1 })
      .withMessage('Please enter your name'),
    check('email')
      .isLength({ min: 1 })
      .withMessage('Please enter your email'),
    check('age')
      .isLength({ min: 1 })
      .withMessage('Please enter your age'),
    check('city')
      .isLength({ min: 1 })
      .withMessage('Please enter your city name'),
    check('whatsappnum')
      .isLength({ min: 1 })

      .withMessage('Please enter you whatsapp number'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const registration = new Registration(req.body);
      registration.save()
        .then(() => { res.send('Thank you for your registration!'); })
        .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
        });
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
  });

  router.get('/registrations', (req, res) => {
    Registration.find()
      .then((registrations) => {
        res.render('index', { title: 'Listing registrations', registrations });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
  });
  

// router.get('/registrations', basic.check((req, res) => {
//   Registration.find()
//     .then((registrations) => {
//       res.render('index', { title: 'Listing registrations', registrations });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send('Sorry! Something went wrong.');
//     });
// }));

module.exports = router;