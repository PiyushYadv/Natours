const express = require('express');
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData,
  getMyTours,
  alerts,
} = require('../controllers/viewsController');
const { isLoggedIn, protect } = require('../controllers/authController');
const { createBooking } = require('../controllers/bookingController');
// const { createBookingCheckout } = require('../controllers/bookingController');

const router = express.Router();

// router.use(isLoggedIn);

/* router.get('/', (req, res) => {
  res.status(200).render('base', {
    title: 'Exciting tours for adventurous people',
    user: 'Piyush Yadav',
  });
}); */

// router.get('/', getBase);

router.use(alerts);

router.get('/', isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/me', protect, getAccount);
router.get(
  '/my-tours',
  // createBookingCheckout,
  protect,
  getMyTours,
);

router.post('/submit-user-data', protect, updateUserData);

module.exports = router;
