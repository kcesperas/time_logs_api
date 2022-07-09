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
    const { id } = req.params;


    Users.findByPk(id, {where: { deletedAt: {
      [Op.ne]: null
    }
    }})
    .then(user => {
        console.log(user)
      res.send(user);
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};



exports.deleteUser = (req, res) => {
  const { userIds } = req.body;

       
  Users.update({deletedAt: new Date, status: "deleted"}, {where: { [Op.or]: userIds.map(a => { return {id: a}}) }})
  .then (doc => {

    
  res.send({message: "users deleted succesfully"})
  })

  .catch(err => {
  console.log(err)
  res.status(500).send({message: err.message})
  })
};

exports.suspendUser = (req, res) => {
  const { userIds } = req.body;

  console.log(req.user.name)

  Users.update({suspendedAt: new Date, status: "suspended", suspendedBy: req.user.name }, {where: { [Op.or]: userIds.map(a => { return {id: a}}) }})
  .then (doc => {

    
  res.send({message: "users suspended succesfully"})
  })

  .catch(err => {
  console.log(err)
  res.status(500).send({message: err.message})
  })

}




exports.activateUser = (req, res) => {
  const {userIds} = req.body;

  console.log(req.user.name)

  Users.update({suspendedAt: null, status: "activated", suspendedBy: null }, {where: { [Op.or]: userIds.map(a => { return {id: a}}) }})
  .then (doc => {

    
  res.send({message: "users reactivated succesfully"})
  })

  .catch(err => {
  console.log(err)
  res.status(500).send({message: err.message})
  })

}
