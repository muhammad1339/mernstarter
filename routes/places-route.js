const express = require('express');

const router = express.Router();

const placesController = require('../controllers/places-controller');

// getting place by id
router.get('/:pid', placesController.getPlaceById);
// getting place by user id
router.get('/user/:uid', placesController.getPlaceByUserId)

// create a new place using post request
router.post('/', placesController.createNewPlace);

// patch request to update place
router.patch('/:pid', placesController.updatePlace);

// delete request to handle delete process
router.delete('/:pid', placesController.deletePlace);

module.exports = router;