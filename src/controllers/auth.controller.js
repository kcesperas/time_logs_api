const db = require("../../models");
const config = require("../../config/auth.config");

const Users = db.users;
const Roles = db.roles;
const Phones = db.phones
const Businesses = db.businesses;



const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const { validateLoginData } = require('../utils/validators')
// const { validateSignupData } = require('../utils/validators')


exports.signup = async (req, res) => {
    const { password, roles, phones } = req.body;

  // Save Users to Database
  // const { valid, errors } = validateSignupData(req.body);
  // if (!valid) return res.status(400).json(errors);




  




  Users.create({
    ...req.body,
    password: bcrypt.hashSync(password, 8)
  })
    .then(user => {

      if(phones.length !== 0){
        const getData = async () => {
          return Promise.all(phones.map(a => {
            return Phones.findOrCreate({
               where: { phone: a.phone, label: a.label },
               raw: true
             });
           }))
        }

        getData().then(phone => {
          
         let myPhones = phone.map(a => {
            return a[0].id;
          })

          console.log(myPhones)
          user.setPhones(myPhones)
        })
        }  
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



exports.signin = (req, res) => {
  // const { valid, errors } = validateLoginData(req.body);
  // if (!valid) return res.status(400).json({ errors, message: { text: 'Something went wrong!', type: 'error'}});
  Users.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      console.log(user)
      if (!user) { 
        return res.status(404).send({ message: { text: "Users Not found.", type: "error"} });
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

      user.lastLoginAt = new Date();
      user.status = "active"

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
          email: user.email,
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
      include: [{ model: Roles}, { model: Businesses, as: 'business' }],
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


// exports.suspendUser = (req, res) => {
//   const { userIds } = req.body;

//   console.log(req.user.name)

//   Users.update({suspendedAt: new Date, status: "suspended", suspendedBy: req.user.name }, {where: { [Op.or]: userIds.map(a => { return {id: a}}) }})
//   .then (doc => {

    
//   res.send({message: "users suspended succesfully"})
//   })

//   .catch(err => {
//   console.log(err)
//   res.status(500).send({message: err.message})
//   })

// }




// exports.activateUser = (req, res) => {
//   const {userIds} = req.body;

//   console.log(req.user.name)

  
// }



 

  
  
  
    

