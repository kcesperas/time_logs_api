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
    db.createTable.bind(db, 'accounts', {
      id: { type:'int', primaryKey: true, autoIncrement: true },
      name: 'string',
      description: 'string',
      status: {type: 'int', defaultValue: 0},
      public_key: 'string',
      secret_key: 'string',
      oms_public_key: 'string',
      oms_secret_key: 'string',
      created_by: 'int',
      created_at: { type: 'timestamp' },
      modified_at: { type: 'datetime'},
      modified_by: 'int',
      deleted_at: { type: 'datetime'},
      deleted_by: 'int'
    }),
    db.addIndex.bind(db, 'accounts', 'ix_public_key', ['public_key'], []),
  ], callback)
};

exports.down = function(db, callback) {
  async.series([
    db.removeIndex.bind(db, 'accounts', 'ix_public_key'),
    db.dropTable.bind(db, 'accounts')
  ], callback)
};

exports._meta = {
  "version": 1
};
