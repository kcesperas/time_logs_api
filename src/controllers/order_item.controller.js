const db = require("../../models");
const Order_items = db.order_items;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const { validateLoginData } = require('../utils/validators')
// const { validateSignupData } = require('../utils/validators')


Exports.createRecord = async (req, res) => {
    Order_items.create(req.body)
    .then(order_item => {
        console.log(order_item)
        res.send({message: "Order item created succesfully"})
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({message: err.message})
    })
    }


Exports.updateRecordById = async (req, res) => {
    let {id} = req.params;
    Order_items.update(req.body, {where: {id}})
    .then(order_item => {
        console.log(order_item)
        res.send({message: "order_item updated succesfully"})
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({message: err.message})
    })
}


Exports.getAllRecords = async (req, res) => {
    Order_items.findAll({where: {deletedAt: {
        [Op.is]: null
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


Exports.getRecordById = async (req, res) => {
    let {id} = req.params;
    Order_items.FindByPk(id, {where: {deletedAt: {
        [Op.ne]: null
    }}})
    .then(order_item => {
        console.log(order_item)
        res.send({message: "Order item data fetched succesfully"})
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({message: err.message})
    })
}


Exports.deleteRecordById = async (req, res) => {
    let {id} = req.params;
    Order_items.update({deletedAt: new Date ()}, {where: {id}})

    .then(order_item => {
      console.log(order_item)
      res.send({message: "order_item data deleted succesfully"})
    })

    
  }
  