const db = require("../../models");
const Payments = db.payments;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const { validateLoginData } = require('../utils/validators')
// const { validateSignupData } = require('../utils/validators')


exports.createRecord = async (req, res) => {
      Payments.create(req.body)
      .then
      (payment => {
      console.log(payment)
      res.send({message : "payment created succesfully"});
      })
      .catch
      (err => {
      console.log(err);
      res.status(500).send ({message: err.message});
      });
    }


exports.updateRecordById = async (req, res) => {  
      let { id } = req.params;
      Payments.update(req.body, {where: { id }})
      .then (payment => {
      console.log(payment)
      res.send({message: "payment updated succesfully"})
      })

      .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
      })
  }

exports.getAllRecords = async (req, res) => {
      Payments.findAll({ where: {deletedAt: {
      [Op.is] : null
  } }})
      .then(doc => {
      console.log(doc)
      res.send(doc)
      })
      .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
  })
  }


exports.getRecordById = async (req, res) => {
      let {id} = req.params;
      Payments.findByPk(id, {where: {deletedAt: {
      [Op.ne]: null
  } }})
      .then(payment => {
      console.log(payment)
      res.send(payment)
    })
      .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
  })
  }

exports.deleteRecordById = async (req, res) => {
    let {id} = req.params
      Payments.update({deletedAt: new Date ()}, {where: {id}})

    .then(payment => {
      console.log(payment)
      res.send({message: "payment data deleted succesfully"})
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
  })
    
  }
  