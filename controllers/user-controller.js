const HttpError = require("../model/http-error-model");
const UserModel = require("../model/user");

const getUsers = (req, res, next) => {

    res.status(200)
        .json(
            {
                code: 200,
                message: "users are found will provide array of users"
            }
        );

}

const login = (req, res, next) => {
    res.status(200)
        .json(
            {
                code: 200,
                message: "user logged in successfully"
            }
        );

}

const signup = async (req, res, next) => {
    const {name, phone, email, password, avatarPath, address} = req.body;
    // create a new user
    const createdUser = {name, phone, email, password, avatarPath, address};
    try {
        const userModel = new UserModel(createdUser);
        await userModel.save();
    } catch (e) {
        return next(new HttpError("bad request", 400));
    }
    res.status(200)
        .json({
                code: 200,
                message: "user signed up successfully",
                user: createdUser
            }
        );
}

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;