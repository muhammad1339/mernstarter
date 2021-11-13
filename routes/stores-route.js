const express = require('express');

const router = express.Router();

const storesController = require('../controllers/stores-controller');

// getting place by id
// router.get('/:storeId', storesController.getStoreById);
// getting place by user id
// router.get('/user/:uid', storesController.getStoreByUserId);

// create a new place using post request
router.post('/', storesController.createNewStore);

// patch request to update place
// router.patch('/:storeId', storesController.updateStore);

// delete request to handle delete process
// router.delete('/:storeId', storesController.deleteStore);

module.exports = router;