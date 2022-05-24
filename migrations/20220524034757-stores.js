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
  db.createTable('stores', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    brand_id: { type: 'int' },
    name: 'string',
    description: 'string',
    status: 'string',
    address: 'string',
    service_area: 'text',
    latitude: 'string',
    longitude: 'string',
    contact_number: 'string',
    email_address: 'string',
     
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
