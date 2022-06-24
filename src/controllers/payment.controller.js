const db = require("../../models");
const User = db.payments;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const { validateLoginData } = require('../utils/validators')
// const { validateSignupData } = require('../utils/validators')


exports.createRecord = async (req, res) => {
    const { description, type, amount, notes } = req.body;


    Payment.create({
    ...req.body
  })
    .then(payment => {
        console.log(payment)
      res.send({ message: "User was registered successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};
