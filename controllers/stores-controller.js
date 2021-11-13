const HttpError = require("../model/http-error-model");
const StoreModel = require('../model/stores-model');

const getStoreById = async (req, res, next) => {
    // get store id from request param
    let storeID = req.params.pid;
    // query store by id
    // check store is found or not (try - catch)
    let store;
    try {
        store = await StoreModel.findById(storeID);
    } catch (e) {
        return next(new HttpError('Something went wrong', 500));
    }

    // if store not found
    if (!store) {
        return next(new HttpError('Store with provided id not found', 404));
    }

    res.status(200)
        .json({msg: "store found successfully", code: 200, store});
};

const getStoreByUserId = (req, res, next) => {
    res.status(200)
        .json({msg: "it is json response for getting store by user id !!!" + req.params.uid});
};

const createNewStore = async (req, res, next) => {
    const {name, description, location, address} = req.body;
    // console.log(req.body);
    // create a new store from destructed request body
    const createdStore = {
        name,
        description,
        location,
        address,
    };
    // insert store in mongodb
    try {
        const storeModel = new StoreModel(createdStore);
        await storeModel.save();
        console.log("inserted<<<<");
    } catch (e) {
        res.status(400)
            .json({
                code: 400,
                message: e.message
            });
        return;
    }

    // if post request processed successfully reply with json response with success state
    res.status(201)
        .json({
            code: 201,
            message: "store Created Successfully",
            store: createdStore
        });
}

// handle update
const updateStore = (req, res, next) => {
    const storeId = req.params.pid;
    res.status(200)
        .json({code: 200, message: "store updated successfully"});
}

// handle delete
const deleteStore = (req, res, next) => {
    const storeId = req.params.pid;
    res.status(200)
        .json({code: 200, message: "store deleted successfully"});
}
// multi export
exports.getStoreById = getStoreById;
exports.getStoreByUserId = getStoreByUserId;
exports.createNewStore = createNewStore;
exports.updateStore = updateStore;
exports.deleteStore = deleteStore;