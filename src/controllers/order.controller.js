const db = require("../../models");
const Orders = db.orders;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const { validateLoginData } = require('../utils/validators')
// const { validateSignupData } = require('../utils/validators')


exports.createRecord = async (req, res) => {
      Orders.create(req.body)
      .then
      (order => {
      console.log(order)
      res.send({message : "order created succesfully"});
      })
      .catch
      (err => {
      console.log(err);
      res.status(500).send ({message: err.message});
      });
    }


exports.updateRecordById = async (req, res) => {  
      let { id } = req.params;
      Orders.update(req.body, {where: { id }})
      .then (order => {
      console.log(order)
      res.send({message: "order updated succesfully"})
      })

      .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
      })
  }

exports.getAllRecords = async (req, res) => {
      Orders.findAll({ where: {deletedAt: {
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
      Orders.findByPk(id, {where: {deletedAt: {
      [Op.ne]: null
  } }})
      .then(order => {
      console.log(order)
      res.send(order)
    })
      .catch(err => {
      console.log(err)
      res.status(500).send({message: err.message})
  })
  }

exports.deleteRecordById = async (req, res) => {
    let {id} = req.params
      Orders.update({deletedAt: new Date ()}, {where: {id}})

    .then(order => {
      console.log(order)
      res.send({message: "order data deleted succesfully"})
    })

    
  }
  