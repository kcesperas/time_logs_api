const db = require("../../models");
const Phones = db.phones;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// const { validateLoginData } = require('../utils/validators')
// const { validateSignupData } = require('../utils/validators')




exports.createRecord = async (req, res) => {
    Phones.create(req.body)
    .then(phone => {
        console.log(phone)
        res.send({message: "Succesfully created phones"})
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({message: err.message})
    });
};


exports.updateRecordById = async (req, res) => {
    let { id } = (req.params)
    Phones.update(req.body, {where: { id }})
    .then(phone => {
        console.log(phone)
        res.send({message: "Succesfully updated phone data"})
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({message: err.message})
    });
};
exports.getAllRecords = async (req, res) => {
    Phones.findAll({where: { deletedAt: {
        [Op.is] : null
    }}})
    .then(doc => {
        console.log(doc)
        res.send(doc)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({message: err.message})
    });
};


exports.getRecordById = async (req, res) => {
    let {id} = req.params;
    Phones.findByPk(id, {where: { deletedAt: {
        [Op.ne]: null
    } }})
    .then(phone => {
        console.log(phone)
        res.send(phone)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({message: err.message})
    })
}



exports.deleteRecordById = async (req, res) => {
    let { id } = req.params;
    Phones.update({deletedAt: new Date()}, {where: {id}}
    )
    .then(phone => {
        console.log(phone)
        res.send({message: "succesfully deleted phone data"})
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({message: err.message})
    })
}