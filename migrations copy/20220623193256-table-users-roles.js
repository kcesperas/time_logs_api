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
    db.createTable.bind(db, 'users_roles', {
      id: {      
        type: 'int',
        unsigned: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: true,
        length: 10 
    },
      role_id: {
        type: 'int',
        unsigned: true,
        length: 10,
        notNull: true
      },
      user_id: {
        type: 'int',
        unsigned: true,
        length: 10,
        notNull: true
      },
      notes: 'string',
      deleted_at: { type: 'datetime'}
    }),
  ], callback)
};

exports.down = function(db, callback) {
  async.series([
    db.dropTable.bind(db, 'users_roles')
  ], callback)
};

exports._meta = {
  "version": 1
};
