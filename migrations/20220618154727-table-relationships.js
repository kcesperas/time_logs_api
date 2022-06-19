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
  // async.series([
  //   db.addForeignKey.bind(db, 'users', 'businesses', 'users_businesses_id_foreign',
  //   {
  //     'business_id': 'id'
  //   },
  //   {
  //     onDelete: 'CASCADE',
  //     onUpdate: 'RESTRICT'
  //   }),
  // ], callback)
};

exports.down = function(db, callback) {
  // async.series([
  //   db.removeForeignKey.bind(db, 'users', 'users_businesses_id_foreign')
  // ], callback)
};

exports._meta = {
  "version": 1
};
