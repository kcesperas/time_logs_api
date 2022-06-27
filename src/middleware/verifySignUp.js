const db = require("../../models");
const ROLES = ["super", "admin", "user", "cashier" ];  
const User = db.users;

checkDuplicateUsernameOrEmail = (req, res, next) => {

  const resp = {
    message: "Failed! Username is already in use!",
    errors: { username: 'Failed! Username is already in use!' }
  }


  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
        errors: { username: 'Failed! Username is already in use!' }
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email_address: req.body.email_address
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
          errors: { email_address: 'Failed! Email is already in use!' }
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
      if (!ROLES.includes(req.body.roles)) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles
        });
        return;
      }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;