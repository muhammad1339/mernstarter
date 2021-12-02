const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator"); // is better than isemail
const HttpError = require("../model/http-error-model");
const UserModel = require("../model/user");
const user = require("../model/user");
// const express = require("express");

const getUsers = async (req, res, next) => {
  let users;
  try {
    // find second parameter is to exclude these props from result
    users = await UserModel.find({}, "-password -__v");
  } catch (error) {
    return next(new HttpError("failed to get users, try again later", 500));
  }
  if (!users) {
    return next(new HttpError("no users yet, try again later", 500));
  }
  res.status(200).json({
    code: 200,
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const login = async (req, res, next) => {
  // destruct request body
  const { email, password } = req.body;
  // validate email
  if (!emailValidator.validate(email)) {
    return next(new HttpError("invalid email format, check your data", 422));
  }
  // check for email is exists (query user by email)
  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email });
  } catch (error) {
    return next(new HttpError("failed to login, try again later", 500));
  }
  if (!existingUser) {
    return next(new HttpError("user not found, try again later", 500));
  }
  // check password
  const match = await bcrypt.compare(password, existingUser.password);
  if (!match) {
    return next(new HttpError("password not correct, check it again", 203));
  }

  res.status(200).json({
    code: 200,
    message: "user logged in successfully",
  });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("invalid inputs , check your data", 422));
  }
  const {
    name,
    phone,
    email,
    password,
    avatarPath,
    address,
  } = req.body;
  // check email format
  if (!emailValidator.validate(email)) {
    return next(new HttpError("invalid email format, check your data", 422));
  }
  // check if user already exists using find method
  let isExistingUser; // user model object it's not a boolean value
  try {
    isExistingUser = await UserModel.findOne({ email });
  } catch (error) {
    return next(new HttpError("failed to check for existing user!", 500));
  }
  // if user found raise error with email already exists
  if (isExistingUser) {
    return next(new HttpError("email already exists, try another one!", 422));
  }
  try {
    isExistingUser = await UserModel.findOne({ phone });
  } catch (error) {
    return next(new HttpError("failed to check for existing user!", 500));
  }
  // if user found raise error with email already exists
  if (isExistingUser) {
    return next(new HttpError("phone already exists, try another one!", 422));
  }
  // hash password
  let hashedPassword = password;
  try {
    const salt = bcrypt.genSaltSync(10);
    hashedPassword = bcrypt.hashSync(password, salt);
    console.log(hashedPassword);
  } catch (error) {
    return next(new HttpError("unable to sign up something went wrong", 500));
  }

  // create a new user
  const createdUser = {
    name,
    phone,
    email,
    password: hashedPassword,
    avatarPath,
    address,
    stores : [],
  };
  let user;
  try {
    const userModel = new UserModel(createdUser);
    user = await userModel.save();
  } catch (e) {
    return next(new HttpError("could not signup", 500));
  }
  res.status(200).json({
    code: 200,
    message: "user signed up successfully",
    user: user.toObject({ getters: true }),
  });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
