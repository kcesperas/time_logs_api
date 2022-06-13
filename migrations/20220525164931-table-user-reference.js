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
    db.createTable.bind(db, 'user_reference', {
    id: { type:'int', primaryKey: true, autoIncrement: true },
    user_id: 'int',
    type: 'string',
    username: 'string',
    first_name: 'string',
    last_name: 'string',
    reference_1: 'string',
    reference_2: 'string',
    reference_3: 'string',
    deleted_at: { type: 'datetime'},
    deleted_by: 'int'
  }),
  db.addIndex.bind(db, 'user_reference', 'ix_user_id', ['user_id'], []),
], callback) 
};

exports.down = function(db, callback) {
  async.series([
    db.removeIndex.bind(db, 'user_reference', 'ix_user_id'),
    db.dropTable.bind(db, 'user_reference')
  ], callback)
};

exports._meta = {
  "version": 1
};
