const db = require("../../models");
const Products = db.products;
const Tags = db.tags;
const Pricings = db.pricings;
const Businesses = db.businesses;



const Op = db.Sequelize.Op;

const { parseObject, parseProducts } = require('../utils/helpers');
const { foldersList } = require('../utils/commonData');



exports.createRecord = async (req, res) => {

  let { labels } = req.body;
  Products.create(req.body)
    .then(product => {
        if(labels.length !== 0) {
          product.setLabels(labels)
        }
        res.send({ message: "Products was created successfully!" });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.createLabelRecord = async (req, res) => {
  console.log(req.body)
  const { name } = req.body;
  const slug = name.replace(/\s/g, '').toLowerCase();

  Tags.create({...req.body, slug: slug, type: 'products'})
    .then(tag => {
        res.send({ message: "Label was created successfully!" });
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
      res.send({ message: "Products was updated successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};



exports.updateProductLabels = async (req, res) => {
  let { id } = req.params;
  let { label } = req.body;
  console.log(label)
  console.log(id)
  try {
    const product = await Products.findOne({
      where: {
        id: id,
        deletedAt: null
      },
    });

    console.log(product)
    let ind = await product.hasLabel(label)
    console.log(ind)
    if(ind){
        product.removeLabel(label);
    } else {
        product.addLabel(label);
    }

    product.save();

    res.send({ message: "Product labels was updated successfully!" });
  } catch(err) {
    res.status(500).send({ message: err.message });
  }

};

exports.updateLabelsRecordById = async (req, res) => {
  let { id } = req.params;

  Tags.update(req.body, { where: { id } })
    .then(product => {
      res.send({ message: "Label was updated successfully!" });
 
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};





exports.getAllRecords = async (req, res) => {
  console.log(req.query)
  console.log('getting products')
  let options = {};


  Object.entries(req.query).forEach(([key, value]) => {
    if(key === 'selectedLabel' && value){
      options['$labels.id$'] = value;
      options['deletedAt'] = null

    }

    if(key === 'selectedFolder' && value){
      if(value === 'trash'){
        options['deletedAt'] = null
      }
      if(value === 'available'){
        options['stocks'] = { [Op.gt]: 0 }
        options['deletedAt'] = null

      }

      if(value === 'unavailable'){
        options['stocks'] = { [Op.lte]: 0 }
        options['deletedAt'] = null

      }


      if(value === 'starred'){
        options['starred'] = true
        options['deletedAt'] = null

      }

      if(value === 'products'){
        options['deletedAt'] = null
      }

    }

  })

  try {
    let products = await parseProducts(await Products.findAll({where: options, include: [{ model: Tags, as: 'labels' }] }));
  
  
  


        res.status(200).json(products);
  } catch(err) {
    console.log(err)
    res.status(500).send({ message: err.message });

  }
};


exports.getAllProductsLabels = async (req, res) => {
  Tags.findAll({ where: { type: 'products', deletedAt: null }})
  .then(doc => {
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


exports.deleteLabelsRecord = async (req, res) => {
  let { id } = req.params;

    Tags.update({deletedAt: new Date()}, { where: { id } })
    .then(product => {
        console.log(product)  
      res.send({ message: "Label was deleted successfully!" });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};


exports.getProductsCount = async (req, res) => {



  

  try {

    let productsList = await parseProducts(await Products.findAll({ include: [{ model: Tags, as: 'labels' }] }));

    let labelsList = await Tags.findAll({ where: { deletedAt: null, type: 'products' }}); 
  
  
  
    const counter = { folders: {}, labels: {} };
    foldersList.map(item => {
      if (item.slug === 'starred') {
        counter.folders[item.id] = productsList.filter(product => product.starred && !product.deletedAt).length;
      } else if (item.slug === 'available') {
        counter.folders[item.id] = productsList.filter(product => product.stocks >= 1 && !product.deletedAt).length;
      } else if (item.slug === 'unavailable') {
        counter.folders[item.id] = productsList.filter(product => product.stocks == 0 && !product.deletedAt).length;
      } else {
        counter.folders[item.id] = productsList.filter(product => product.folder === item.slug).length;
      }
      return null;
    });
    
    labelsList.map(item => {
      counter.labels[item.id] = productsList.filter(product => product.labels.includes(item.id) && !product.deletedAt).length;
      return null;
    });
  




    res.status(200).json(counter);




  } catch(err){
    console.log(err)
    res.status(500).send({ message: err.message });
  }

};


