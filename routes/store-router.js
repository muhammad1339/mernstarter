const express = require('express');

const router = express.Router();

const storesController = require('../controllers/store-controller');

// getting store by id
router.get('/:store_id', storesController.getStoreById);
// getting store by user id
router.get('/user/:owner_id', storesController.getStoreByOwnerId);

// create a new store using post request
router.post('/', storesController.createNewStore);

// patch request to update place
// router.patch('/:store_id', storesController.updateStore);

// delete request to handle delete process
// router.delete('/:store_id', storesController.deleteStore);

module.exports = router;