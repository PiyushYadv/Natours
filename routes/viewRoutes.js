const express = require('express');
const { getOverview, getTour } = require('../controllers/viewsController');

const router = express.Router();

/* router.get('/', (req, res) => {
  res.status(200).render('base', {
    title: 'Exciting tours for adventurous people',
    user: 'Piyush Yadav',
  });
}); */

// router.get('/', getBase);

router.get('/', getOverview);

router.get('/tour/:slug', getTour);

module.exports = router;
