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
    db.createTable.bind(db, 'user_roles', {
      id: {      
        type: 'int',
        unsigned: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: true,
        length: 10 
      },
      user_id: { 
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10 
      },
      role_id: { 
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10 
      },
      created_at: { type: 'timestamp' },
      deleted_at: { type: 'datetime'}
    }),
  ], callback)
};

exports.down = function(db, callback) {
  async.series([
    db.dropTable.bind(db, 'user_roles')
  ], callback)
};

exports._meta = {
  "version": 1
};
