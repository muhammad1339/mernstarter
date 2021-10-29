const getUsers = (req, res, next) => {

    res.status(200)
        .json(
            {
                code:200 ,
                message : "users are found will provide array of users"
            }
        )

}

const login = (req, res, next) => {
    res.status(200)
        .json(
            {
                code:200 ,
                message : "user logged in successfully"
            }
        )

}

const signup = (req, res, next) => {


    res.status(200)
        .json(
            {
                code:200 ,
                message : "user signed up successfully"
            }
        )
}

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;