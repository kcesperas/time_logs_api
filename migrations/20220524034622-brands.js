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
  db.createTable('brands', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    merchant_group_id: { type: 'int' , defaultValue: 0},
    code: 'string',
    name: 'string',
    description: 'string',
    status: { type: 'int', defaultValue: 0},
    address: 'string',
    owner_fullname: 'string',
    owner_contact_number: 'string',
    owner_email: 'string',
    
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