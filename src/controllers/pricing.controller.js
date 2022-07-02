const db = require("../../models")
const Pricings = db.pricings;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const { validateLoginData } = require('../utils/validators')
// const { validateSignupData } = require('../utils/validators')


exports.createRecord = async (req, res) => {
    Pricings.create(req.body)
    .then(pricing => {
        console.log(pricing)
        res.send({message: "Pricing created succesfully"})
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({message: err.message})
    })
}
exports.updateRecordById = async (req, res) => {
    let { id } = req.params
    Pricings.update(req.body, {where: {id} })
    .then(pricing => {
        console.log(pricing)
        res.send({message: "Pricing updated succefully"})
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({message: err.message})
    })
}

exports.getAllRecords = async (req, res) => {
    Pricings.findAll({where: {deletedAt: {
        [Op.is]: null
    }}})
    .then(doc => {
        console.log(doc)
        res.send(doc)
    })
    .catch(err => {
        console.log(err)
        res.send({message: err.message})
    })
}
exports.getRecordById = async (req, res) => {
    let { id } = req.params
    Pricings.findByPk(id, {where: {deletedAt: {
        [Op.ne]: null
    }}})
    .then(pricing => {
        console.log(pricing)
        res.send(pricing);
    })
    .catch(err => {
        console.log(err)
        res.satus(500).send({message: err.message})
    })
}
exports.deleteRecordById = async (req, res) => {
    let { id } = req.params;
    Pricings.update({deletedAt: new Date ()}, {where: {id}}
    )
    .then(pricing => {
        console.log(pricing)
        res.send({message: "pricing deleted succesfully"})
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({message: err.message})
    })
}