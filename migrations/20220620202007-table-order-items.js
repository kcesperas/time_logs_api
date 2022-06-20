'use strict';

const async = require('async')


var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  async.series([
    db.createTable.bind(db, 'order_items', {
      id: {      
          type: 'int',
          unsigned: true,
          notNull: true,
          primaryKey: true,
          autoIncrement: true,
          length: 10 
      },
      qty: 'string',
      price: 'string',
      subtotal: 'string',
      notes: 'string',
      created_at: { type: 'timestamp' },
      deleted_at: { type: 'datetime'},
      inventory_id: {      
        type: 'int',
        unsigned: true,
        length: 10   },
      product_id: {      
        type: 'int',
        unsigned: true,
      length: 10   },
      order_id: {      
        type: 'int',
        unsigned: true,
        length: 10   }  
    }),
  ], callback)
};

exports.down = function(db, callback) {
  async.series([
    db.dropTable.bind(db, 'order_items')
  ], callback)
};

exports._meta = {
  "version": 1
};
