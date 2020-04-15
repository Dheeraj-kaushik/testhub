const http = require('http');
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const Candidate = require('../models/candidate.model')


exports.signup = async (req, res) => {
  // check if account exists
  let candidate = await Candidate.findOne({ email: req.body.email })
  if(candidate) {
    // 409 : Conflict
    return res.status(409).send({ msg: "User already exists with same email id."})
  }

  // create new user(candidate), hash the password
  candidate = new Candidate({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    gender: req.body.gender,
    location: req.body.location,
    //skills
  })

  // saving user in DB
  candidate = await candidate.save()

  res.status(200).send({ msg: "Account created successfully." })
};

exports.signin = async (req, res) => {
  // check if account exists with this email
  let candidate = await Candidate.findOne({ email: req.body.email })
  if(!candidate) {
    // 404 : Not Found
    return res.status(404).send({ msg: "Account does not exist." })
  }

  // check credentials
  if(!bcrypt.compareSync(req.body.password, candidate.password)) {
    // 403 : Forbidden
    return res.status(403).send({ msg: "Invalid Password." })
  }

  res.status(200).send(candidate);
};

exports.signout = function (req, res) {
  //TODO
};

exports.signoutall = function (req, res) {
  //TODO
};

exports.dashboard = function (req, res) {
    //TODO
};

exports.resetpassword = function (req, res) {
    //TODO
};

exports.updateprofile = function (req, res) {
    //TODO
};

exports.attempttest = function (req, res) {
    //TODO
};

exports.practicetest = function (req, res) {
    //TODO
};