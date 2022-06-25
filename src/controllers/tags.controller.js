const db = require("../../models");
const Tags = db.tags;

const Op = db.Sequelize.Op;


exports.createRecord = async (req, res) => {

    Tags.create(req.body)
    .then(tag => {
        console.log(tag)
      res.send({ message: "Tag was created successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.updateRecordById = async (req, res) => {
  let { id } = req.params;

    Tags.update(req.body, { where: { id } })
    .then(tag => {
        console.log(tag)
      res.send({ message: "Tag was updates successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};


exports.getAllRecords = async (req, res) => {
    Tags.findAll({ where: { deletedAt: {
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

    Tags.findByPk(id, { where: { deletedAt: {
			[Op.ne]: null
		} } })
    .then(tag => {
        console.log(tag)
      res.send(tag);
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.deleteRecordById = async (req, res) => {
  let { id } = req.params;


    Tags.update({deletedAt: new Date()}, { where: { id } })
    .then(tag => {
        console.log(tag)
      res.send({ message: "Tag was deleted successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};