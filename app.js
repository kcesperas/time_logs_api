require('dotenv').config();
const EXPRESS = require('express')
const cors = require('cors')
const moment = require('moment-timezone')

const app = new EXPRESS()


moment.tz.setDefault('Asia/Manila')

app.use(cors())
app.use(EXPRESS.json())
app.use(EXPRESS.urlencoded({ extended: false }))





// Register all routes
<<<<<<< HEAD
app.require('./src/routes/auth.route')(app);
app.require('./src/routes/payment.route')(app);
=======
require('./src/routes/auth.route')(app);
require('./src/routes/user.route')(app);


>>>>>>> d6af7e3797399b077b10c58bf6fcf7be413f19de

// app.use(require('@middlewares/error-handler'))


module.exports = app