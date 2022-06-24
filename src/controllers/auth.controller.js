const db = require("../../models");
const Users = db.users;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const { validateLoginData } = require('../utils/validators')
// const { validateSignupData } = require('../utils/validators')


exports.signup = async (req, res) => {
    const { username, email_address, password } = req.body;
  // Save Users to Database
//   const { valid, errors } = validateSignupData(req.body);
//   if (!valid) return res.status(400).json(errors);
//   let { email, password, username, areaCode, supporterId, roles, level } = req.body;
//   let newAccount = await Account.create({
//     areaCode,
//     level
//   });
  
  Users.create({
    email_address, username,
    password: bcrypt.hashSync(password, 8)
  })
    .then(user => {
        console.log(user)
                    res.send({ message: "Users was registered successfully!" });

    //   if (roles) {
    //     Role.findOne({
    //       where: {
    //         name: roles
    //         }
    //     }).then(role => {
    //       user.setRoles([role]).then(() => {
    //         res.send({ message: "Users was registered successfully!" });
    //       });
    //     });
    //   } else {
    //     // user role = 1
    //     user.setRoles([2]).then(() => {
    //       res.send({ message: "Users was registered successfully!" });
    //     });
    //   }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

