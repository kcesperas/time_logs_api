const db = require("../../models");
const Customers = db.customers;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const { validateLoginData } = require('../utils/validators')
// const { validateSignupData } = require('../utils/validators')


exports.createRecord = async (req, res) => {
      Customers.create(req.body)
      .then
      (customer => {
      console.log(customer)
      res.send({message : "customer created succesfully"});
      })
      .catch
      (err => {
      console.log(err);
      res.status(500).send ({message: err.message});
      });
    }


exports.updateRecordById = async (req, res) => {  
      let { id } = req.params;
      Customers.update(req.body, {where: { id }})
      .then (customer => {
      console.log(customer)
      res.send({message: "customer updated succesfully"})
      })

      .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
      })
  }

exports.getAllRecords = async (req, res) => {
      Customers.findAll({ where: {deletedAt: {
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
      Customers.findByPk(id, {where: {deletedAt: {
      [Op.ne]: null
  } }})
      .then(customer => {
      console.log(customer)
      res.send(customer)
    })
      .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
  })
  }

exports.deleteRecordById = async (req, res) => {
    let {id} = req.params
      Customers.update({deletedAt: new Date ()}, {where: {id}})

    .then(customer => {
      console.log(customer)
      res.send({message: "customer data deleted succesfully"})
    })

    
  }
  