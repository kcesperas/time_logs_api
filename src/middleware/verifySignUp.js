const db = require("../../models");
const ROLES = ["super", "admin", "user", "cashier" ];  
const User = db.users;

checkDuplicateEmail = (req, res, next) => {

  const resp = {
    message: "Failed! Email is already in use!",
    errors: { email: 'Failed! Email is already in use!' }
  }


    

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
          errors: { email: 'Failed! Email is already in use!' }
        });
        return;
      }

      next();
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
  checkDuplicateEmail: checkDuplicateEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;