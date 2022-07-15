const db = require("../../models");
const Users = db.users;
const Businesses = db.businesses;
const Roles = db.roles;
const Phones = db.phones;
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
        where: { deletedAt: { [Op.is]: null }},
        include: [{model: Businesses, as: 'business'}, {model: Roles}, {model: Phones }],
        attributes: { exclude: ['password'] }
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



exports.deleteUser = async (req, res) => {
  const { userIds } = req.body;
  console.log(userIds)
  console.log(req.body)
       
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
  const {id} = req.params;
console.log('SUlod dd')
  Users.update(
    {suspendedAt: new Date, status: "suspended", suspendedBy: req?.user?.name ? req.user.name : 'admin' },
   {where: {id}
  //  plain: true
   })
  .then (doc => {
    console.log(doc)
  Users.findByPk(id)
  .then(doc1 => {
      console.log(doc1)
  res.status(200).json(doc1)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({message: err.message})
    })
  })
  .catch(err => {
  console.log(err)
  res.status(500).send({message: err.message})
  })

}




exports.activateUser = (req, res) => {
  const {id} = req.params;
  console.log('SUlod dd activated')


  Users.update({suspendedAt: null, status: "inactive", suspendedBy: null }, {where: { id }})
  .then (doc => {
    console.log(doc)
    Users.findByPk(id)
    .then(doc1 => {
        console.log(doc1)
    res.status(200).json(doc1)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
      })
  })

  .catch(err => {
  console.log(err)
  res.status(500).send({message: err.message})
  })

}
