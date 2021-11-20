const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const getCoordsForAddress = require("../utils/location");
const HttpError = require("../model/http-error-model");
const StoreModel = require("../model/store");
const User = require("../model/user");

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
  // let resultStore;
  let userWithHisStores;
  try {
    //same => StoreModel.findOne({ownerId:ownerId}) exec() is optional
    // resultStore = await StoreModel.find({ ownerId });
    userWithHisStores = await User.findById(ownerId).populate("ownedStores");
  } catch (e) {
    return next(new HttpError(`something went wrong`, 500));
  }
  //console.log(userWithHisStores);
  // if store not found
  if (!userWithHisStores || userWithHisStores.ownedStores.length === 0) {
    return next(new HttpError("Store with provided owner id not found", 404));
  }
  res.status(200).json({
    message: "get store by owner id successfully",
    code: 200,
    stores: userWithHisStores.ownedStores.map((store) =>
      store.toObject({ getters: true })
    ),
  });
};

const createNewStore = async (req, res, next) => {
  const { name, description, avatarPath, location, address, ownerId } =
    req.body;
  // create a new store from destructed request body
  // let coordinates;
  // try {
  //   coordinates = await getCoordsForAddress(address);
  // } catch (error) {
  //   return next(error);
  // }
  // console.log(coordinates);
  const createdStore = new StoreModel({
    name,
    description,
    avatarPath,
    location,
    address,
    ownerId,
  });
  console.log(ownerId);
  // check if the owner id (user) exists
  let owner;
  try {
    owner = await User.findById(ownerId);
  } catch (error) {
    return next(
      new HttpError("Failed to create new store with this owner", 500)
    );
  }
  if (!owner) {
    return next(new HttpError("this owner is no longer availabe", 404));
  }
  // insert store in mongodb and update user stores
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const storeModel = new StoreModel(createdStore);
    await storeModel.save({ session: session });
    owner.ownedStores.push(storeModel);
    await owner.save({ session: session });
    await session.commitTransaction();
    console.log("inserted<<<<");
  } catch (e) {
    return next(
      new HttpError(
        "session failed-Failed to create new store with this owner",
        500
      )
    );
  }

  // if post request processed successfully reply with json response with success state
  res.status(201).json({
    code: 201,
    message: "store Created Successfully",
    store: createdStore.toObject({ getters: true }),
  });
};

// handle update
const updateStore = async (req, res, next) => {
  const storeId = req.params.store_id;
  const { name, description, avatarPath, location, address } = req.body;
  if (
    !req.body ||
    (!name && !description && !avatarPath && !location && !address)
  ) {
    const error = new HttpError("Nothing to update", 210);
    return next(error);
  }
  let store;
  try {
    store = await StoreModel.findById(storeId);
  } catch (e) {
    const error = new HttpError("failed to find store with provided id", 500);
    return next(error);
  }
  if (!store) {
    const error = new HttpError("this is store not found", 404);
    return next(error);
  }
  if (name && name.length > 0) store.name = name;
  if (description && description.length > 0) store.description = description;
  if (avatarPath && avatarPath.length > 0) store.avatarPath = avatarPath;
  if (address && address.length > 0) store.address = address;
  if (location && location.length > 0) store.location = location;
  try {
    await store.save();
  } catch (e) {
    const error = new HttpError("failed to update store with provided id", 500);
    return next(error);
  }

  res
    .status(200)
    .json({ code: 200, message: "store updated successfully", store });
};

// handle delete
const deleteStore = async (req, res, next) => {
  const storeId = req.params.store_id;
  // find store
  let store;
  try {
    store = await StoreModel.findById(storeId).populate("ownerId");
  } catch (error) {
    return next(
      new HttpError("failed to find this store with provided id", 500)
    );
  }
  console.log(storeId);
  if (!store) {
    return next(new HttpError("can't find this store", 404));
  }
  console.log(store);
  // find user that has created this store
  // delete this store and update owner by deleting this store from owned stores
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await store.remove({ session });
    store.ownerId.ownedStores.pull(store);
    await store.ownerId.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return next(
      new HttpError("failed to delete this store with provided id", 500)
    );
  }

  res.status(200).json({ code: 200, message: "store deleted successfully" });
};
// multi export
exports.getStoreById = getStoreById;
exports.getStoreByOwnerId = getStoreByOwnerId;
exports.createNewStore = createNewStore;
exports.updateStore = updateStore;
exports.deleteStore = deleteStore;
