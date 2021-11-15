const HttpError = require("../model/http-error-model");
const StoreModel = require("../model/store");

const getStoreById = async (req, res, next) => {
  // get store id from request param
  let storeID = req.params.store_id;
  // query store by id
  // check store is found or not (try - catch)
  let store;
  try {
    store = await StoreModel.findById(storeID);
  } catch (e) {
    return next(new HttpError("Something went wrong", 500));
  }

  // if store not found
  if (!store) {
    return next(new HttpError("Store with provided id not found", 404));
  }

  res.status(200).json({
    message: "store found successfully",
    code: 200,
    store: store.toObject({ getters: true }),
  });
};

const getStoreByOwnerId = async (req, res, next) => {
  // provided owner id should be from type object id that has specific length
  const ownerId = req.params.owner_id;
  let resultStore;
  try {
    //same => StoreModel.findOne({ownerId:ownerId}) exec() is optional
    resultStore = await StoreModel.find({ ownerId }).exec();
  } catch (e) {
    return next(new HttpError(`something went wrong`, 500));
  }
  // if store not found
  if (!resultStore || resultStore.length === 0) {
    return next(new HttpError("Store with provided owner id not found", 404));
  }
  res.status(200).json({
    message: "get store by owner id successfully",
    code: 200,
    stores: resultStore.map((store) => store.toObject({ getters: true })),
  });
};

const createNewStore = async (req, res, next) => {
  const { name, description, avatarPath, location, address, ownerId } =
    req.body;
  // console.log(req.body);
  // create a new store from destructed request body
  const createdStore = {
    name,
    description,
    avatarPath,
    location,
    address,
    ownerId,
  };
  // insert store in mongodb
  try {
    const storeModel = new StoreModel(createdStore);
    await storeModel.save();
    console.log("inserted<<<<");
  } catch (e) {
    res.status(400).json({
      code: 400,
      message: "bad request",
    });
    return;
  }

  // if post request processed successfully reply with json response with success state
  res.status(201).json({
    code: 201,
    message: "store Created Successfully",
    store: createdStore,
  });
};

// handle update
const updateStore = (req, res, next) => {
  const storeId = req.params.pid;
  res.status(200).json({ code: 200, message: "store updated successfully" });
};

// handle delete
const deleteStore = (req, res, next) => {
  const storeId = req.params.pid;
  res.status(200).json({ code: 200, message: "store deleted successfully" });
};
// multi export
exports.getStoreById = getStoreById;
exports.getStoreByOwnerId = getStoreByOwnerId;
exports.createNewStore = createNewStore;
exports.updateStore = updateStore;
exports.deleteStore = deleteStore;
