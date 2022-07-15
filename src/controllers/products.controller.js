const db = require("../../models");
const Products = db.products;
const Pricings = db.pricings;
const Tags = db.tags;
const Businesses = db.businesses;



const Op = db.Sequelize.Op;


exports.createRecord = async (req, res) => {

  Products.create(req.body)
    .then(product => {
        console.log(product)
      res.send({ message: "Products was created successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.updateRecordById = async (req, res) => {
  let { id } = req.params;

  Products.update(req.body, { where: { id } })
    .then(product => {
        console.log(product)
      res.send({ message: "Products was updates successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};


exports.getAllRecords = async (req, res) => {
    Products.findAll({ where: { deletedAt: {
      [Op.is] : null  
    } },
    include: [{ model: Pricings}, { model: Pricings, as: 'product_price' }, { model: Tags }, { model: Businesses,  as: 'business' }],
  })
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

    Products.findByPk(id, { where: { deletedAt: {
			[Op.ne]: null
		} } })
    .then(product => {
        console.log(product)
      res.send(product);
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.deleteRecordById = async (req, res) => {
  let { id } = req.params;


    Products.update({deletedAt: new Date()}, { where: { id } })
    .then(product => {
        console.log(product)
      res.send({ message: "Product was deleted successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};