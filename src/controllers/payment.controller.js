const db = require("../../models");
const Payments = db.payments;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const { validateLoginData } = require('../utils/validators')
// const { validateSignupData } = require('../utils/validators')


exports.createRecord = async (req, res) => {
    const { description, amount, type, createdBy, notes } = req.params;


    Payments.create({
    ...req.body,
  })
    .then(user => {
        console.log('from save: ' + this.getModelName(), params )
 jh
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.updateRecordById = async (req, res) => {
    const { description, amount, type, createdBy, notes } = req.body;


    Payments.create({
    ...req.body,
  })
    .then(user => {
        console.log(user)
      res.send({ message: "Payment successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};


exports.getAllRecords = async (req, res) => {


    Payments.findAll({
      params
    })
    .then(doc => {
        console.log(doc)
      res.send(doc);
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};



exports.getRecordById = async (req, res) => {
    const { description, amount, type, createdBy, notes } = req.body;


    Payments.create({
    ...req.body,
  })
    .then(user => {
        console.log(user)
      res.send({ message: "Payments was registered successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.deleteRecordById = async (req, res) => {
    const { description, amount, type, createdBy, notes } = req.body;


    Payments.create({
    ...req.body,
  })
    .then(user => {
        console.log(user)
      res.send({ message: "Payments was registered successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};