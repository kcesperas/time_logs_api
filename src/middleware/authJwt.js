const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const db = require("../../models");
const User = db.users;

verifyToken = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    return res.status(403).json({ text: 'Unauthorized', type: 'error' });
  }


   if (!idToken) {
    return res.status(403).json({
      text: "No token provided!",
      type: 'error' });
  }



  jwt.verify(idToken, config.secret,  async (err, decoded) => {
    if (err) {
      return res.status(401).json({ text: 'Unauthorized', type: 'error' });
    }

    let user = await User.findByPk(decoded.id);
    req.user = user;
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    let { deletedAt, suspendedAt} = user;
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin" && !deletedAt && !suspendedAt) {
          next();
          return;
        }
      }

      return res.status(403).json({  message: { text: 'Require Admin Role!', type: 'error'}});

    });
  });
};

isCashier = (req, res, next) => {

  try{

  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "cashier") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Cashier Role!"
      });
    });
  });

}catch(err){
  res.status(400).send({
    message: "Something went wrong, try again in a few minutes!"
  });
}

};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isCashier: isCashier
  // isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;