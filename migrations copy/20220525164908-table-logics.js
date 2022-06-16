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
    db.createTable.bind(db, 'logics', {
    id: { type:'int', primaryKey: true, autoIncrement: true },
    account_id: 'int',
    name: 'string',
    description: 'string',
    status: {type: 'int', defaultValue: 0},
    code_path: 'string',
    created_by: 'int',
    created_at: 'datetime',
    modified_at: 'datetime',
    modified_by: 'int',
    deleted_at: { type: 'datetime'}
  }),
  db.addIndex.bind(db, 'logics', 'ix_account_id', ['account_id'], []),
  ], callback)  
};

exports.down = function(db, callback) {
  async.series([
    db.removeIndex.bind(db, 'logics', 'ix_account_id'),
    db.dropTable.bind(db, 'logics')
  ], callback)
};

exports._meta = {
  "version": 1
};
