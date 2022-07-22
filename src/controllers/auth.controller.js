const db = require("../../models");
const config = require("../../config/auth.config");

const Users = db.users;
const Roles = db.roles;




const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const { validateLoginData } = require('../utils/validators')
// const { validateSignupData } = require('../utils/validators')


exports.signup = async (req, res) => {
    const { password, roles } = req.body;

  // Save Users to Database
  // const { valid, errors } = validateSignupData(req.body);
  // if (!valid) return res.status(400).json(errors);




  




  Users.create({
    ...req.body,
    password: bcrypt.hashSync(password, 8)
  })
    .then(user => {

      if (roles) {
        Roles.findOne({
          where: {
            name: roles
            }
        }).then(role => {
          user.setRoles([role]).then(() => {
          res.send({ message: `${String(roles).toUpperCase()} was registered successfully!` });
            });
        });
      } else {
        // user role = 1
        user.setRoles([3]).then(() => {
          res.send({ message: "Users was registered successfully!" });
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};



exports.login = (req, res) => {
  // const { valid, errors } = validateLoginData(req.body);
  // if (!valid) return res.status(400).json({ errors, message: { text: 'Something went wrong!', type: 'error'}});
  Users.findOne({
    where: {
      emailAddress: req.body.emailAddress,
      deletedAt: null
    }
  })
    .then(user => {
      console.log(user)
      if (!user) { 
        return res.status(404).send({ message: { text: "User Not found.", type: "error"} });
      }


      if (user.suspendedAt) { 
        return res.status(400).send({ message: { text: "User suspended", type: "error"} });
      }





      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: { text: "Invalid Password!", type: "error"}
        });
      }

  

      var authorities = [];

      // user.lastLoginAt = new Date();
      // user.status = "active"

      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }


        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        user.save();

        res.status(200).send({
          id: user.id,
          emailAddress: user.emailAddress,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
    return  res.status(500).send({ message: err.message });
    });
};





exports.getAuthUser = (req, res) => {
  const { userId } = req.params;
  console.log(req.userId)
  console.log(req.params)
  console.log(req.query)
  // console.log(req.user)
    Users.findByPk(req.userId,{
      where: { 
        deletedAt: {
          [Op.is]: null
        }
        },
      include: [{ model: Roles}],
      attributes: {exclude: ['password']},
     })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({  message: { text: 'Something went wrong!', type: 'error'}});
    })
};


// exports.deleteUser = (req, res) => {
//   const { userIds } = req.body;

       
//   Users.update({deletedAt: new Date, status: "deleted"}, {where: { [Op.or]: userIds.map(a => { return {id: a}}) }})
//   .then (doc => {

    
//   res.send({message: "users deleted succesfully"})
//   })

//   .catch(err => {
//   console.log(err)
//   res.status(500).send({message: err.message})
//   })


// };


exports.logout = (req,res) => { 
  let id  = req.userId;
 
  Users.update({lastLoginAt: new Date, status: "inactive"}, {where: { id: id }})
  .then (doc => {
  res.send({message: "user logout succesfully"})
  })

  .catch(err => {
  console.log(err)
  res.status(500).send({message: err.message})
  })

};


