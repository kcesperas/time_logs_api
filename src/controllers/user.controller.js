const db = require("../../models");
const Users = db.users;
const Businesses = db.businesses;
const Roles = db.roles;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const { validateLoginData } = require('../utils/validators')
// const { validateSignupData } = require('../utils/validators')


exports.createRecord = async (req, res) => {
    const { username, email_address, password } = req.body;


    Users.create({
    ...req.body,
    password: bcrypt.hashSync(password, 8)
  })
    .then(user => {
        console.log(user)
      res.send({ message: "Users was registered successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.updateRecordById = async (req, res) => {
    const { username, email_address, password } = req.body;


    Users.create({
    ...req.body,
    password: bcrypt.hashSync(password, 8)
  })
    .then(user => {
        console.log(user)
      res.send({ message: "Users was registered successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};


exports.getAllRecords = async (req, res) => {

  console.log('Sulod')

    Users.findAll({
        include: [{model: Businesses, as: 'business'}, {model: Roles}]
    })
    .then(doc => {
      res.send(doc);
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};



exports.getRecordById = async (req, res) => {
    const { username, email_address, password } = req.body;


    Users.create({
    ...req.body,
    password: bcrypt.hashSync(password, 8)
  })
    .then(user => {
        console.log(user)
      res.send({ message: "Users was registered successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.deleteRecordById = async (req, res) => {
    const { username, email_address, password } = req.body;


    Users.create({
    ...req.body,
    password: bcrypt.hashSync(password, 8)
  })
    .then(user => {
        console.log(user)
      res.send({ message: "Users was registered successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};