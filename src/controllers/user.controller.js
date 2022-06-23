const db = require("../../models");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const { validateLoginData } = require('../utils/validators')
// const { validateSignupData } = require('../utils/validators')


exports.createRecord = async (req, res) => {
    const { username, email_address, password } = req.body;


    User.create({
    ...req.body,
    password: bcrypt.hashSync(password, 8)
  })
    .then(user => {
        console.log(user)
      res.send({ message: "User was registered successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

