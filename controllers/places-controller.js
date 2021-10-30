const HttpError = require("../model/http_error");
const PlaceModel = require('../model/place');

const getPlaceById = async (req, res, next) => {
    // get place id from request param
    let placeID = req.params.pid;
    // query place by id
    // check place is found or not (try - catch)
    let place;
    try {
        place = await PlaceModel.findById(placeID);
    } catch (e) {
        return next(new HttpError('Something went wrong', 500));
    }

    // if place not found
    if (!place) {
        return next(new HttpError('Place with provided id not found', 404));
    }

    res.status(200)
        .json({msg: "place found successfully", code: 200, place});
};

const getPlaceByUserId = (req, res, next) => {
    res.status(200)
        .json({msg: "it is json response for getting place by user id !!!" + req.params.uid});
};

const createNewPlace = async (req, res, next) => {
    const {title, description, location, address} = req.body;
    console.log(req.body);
    // create a new place from destructed request body
    const createdPlace = {
        title,
        description,
        location,
        address,
    }
    // insert place in mongodb
    try {
        const mmyPlace = new PlaceModel(createdPlace)
        await mmyPlace.save()
        console.log("inserted<<<<")
    } catch (e) {
        res.status(400)
            .json({
                code: 400,
                message: "Bad Request"
            });
        return
    }

    // if post request processed successfully reply with json response with success state
    res.status(201)
        .json({
            code: 201,
            message: "place Created Successfully",
            place: createdPlace
        });
}

// handle update
const updatePlace = (req, res, next) => {
    const placeId = req.params.pid;
    res.status(200)
        .json({code: 200, message: "place updated successfully"})
}

// handle delete
const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    res.status(200)
        .json({code: 200, message: "place deleted successfully"})
}
// multi export
exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createNewPlace = createNewPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;