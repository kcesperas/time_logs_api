'use strict';

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

exports.up = exports.up = function (db, callback) {
  db.createTable('accounts', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: 'string',
    description: 'string',
    status: { type: 'int', defaultValue: 0},
    public_key: 'string',
    secret_key: 'string',
    
    created_by: 'int',
    created_at: 'datetime',
    modified_by: 'int',
    modified_at: 'datetime',
    deleted_at: 'datetime',
  }, callback);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
