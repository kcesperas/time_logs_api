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
  db.createTable('user_references', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    user_id: { type: 'int' },
    type: 'string',
    username: 'string',
    first_name: 'string',
    last_name: 'string',
    reference_1: 'string',
    reference_2: 'string',
    reference_3: 'string',
  }, callback);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
