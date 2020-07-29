const express = require('express');
const favouriteController = require('./../controllers/favouriteController');
const authorization = require('./authorizaton');

const router = express.Router();

router.post('/', authorization.protected, favouriteController.postFavourite);
router.get('/', authorization.protected, favouriteController.getFavourites);
router.get('/top', favouriteController.getTop);
router.get('/:locationId', authorization.protected, favouriteController.checkFavourite);

module.exports = router;
