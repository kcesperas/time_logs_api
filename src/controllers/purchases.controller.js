const db = require("../../models");
const Purchases = db.purchases;

const Op = db.Sequelize.Op;


exports.createRecord = async (req, res) => {

  Purchases.create(req.body)
    .then(purchase => {
        console.log(purchase)
      res.send({ message: "Purchased was created successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.updateRecordById = async (req, res) => {
  let { id } = req.params;

    Purchases.update(req.body, { where: { id } })
    .then(purchase => {
        console.log(purchase)
      res.send({ message: "Purchased was updates successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};


exports.getAllRecords = async (req, res) => {
    Purchases.findAll({ where: { deletedAt: {
      [Op.is] : null  
    } }})
    .then(doc => {
        console.log(doc)
      res.send(doc);
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};



exports.getRecordById = async (req, res) => {
  let { id } = req.params;

    Purchases.findByPk(id, { where: { deletedAt: {
			[Op.ne]: null
		} } })
    .then(purchase => {
        console.log(purchase)
      res.send(purchase);
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.deleteRecordById = async (req, res) => {
  let { id } = req.params;


    Purchases.update({deletedAt: new Date()}, { where: { id } })
    .then(purchase => {
        console.log(purchase)
      res.send({ message: "Purchased was deleted successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};