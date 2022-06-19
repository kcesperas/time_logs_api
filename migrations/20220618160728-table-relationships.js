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
    db.addForeignKey.bind(db, 'users', 'businesses', 'users_business_id_foreign',
    {
      business_id: 'id'
    },
    {
      onDelete: 'CASCADE',
      // onUpdate: 'RESTRICT'
    }),
    db.addForeignKey.bind(db, 'user_roles', 'users', 'user_roles_user_id_foreign',
    {
      user_id: 'id'
    },
    {
      onDelete: 'CASCADE',
      // onUpdate: 'RESTRICT'
    }),
    db.addForeignKey.bind(db, 'user_roles', 'roles', 'user_roles_role_id_foreign',
    {
      role_id: 'id'
    },
    {
      onDelete: 'CASCADE',
      // onUpdate: 'RESTRICT'
    })
  ], callback)
};

exports.down = function(db, callback) {
  async.series([
    db.removeForeignKey.bind(db, 'users', 'users_business_id_foreign'),
    db.removeForeignKey.bind(db, 'user_roles', 'user_roles_user_id_foreign'),
    db.removeForeignKey.bind(db, 'user_roles', 'user_roles_role_id_foreign'),
  ], callback)
};

exports._meta = {
  "version": 1
};
