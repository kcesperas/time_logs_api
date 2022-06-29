require('dotenv').config();
const EXPRESS = require('express')
const cors = require('cors')
const moment = require('moment-timezone')

const app = new EXPRESS()

const db = require('./models');

db.sequelize.sync(
    // {force: true}
    ).then(() => { 
    // initial();
  });




moment.tz.setDefault('Asia/Manila')

app.use(cors())
app.use(EXPRESS.json())
app.use(EXPRESS.urlencoded({ extended: true }))


// Register all routes
require('./src/routes/auth.route')(app);
require('./src/routes/user.route')(app);
require('./src/routes/tags.route')(app);
require('./src/routes/payment.route')(app);
require('./src/routes/pricing.route')(app);
require('./src/routes/order_item.route')(app);
require('./src/routes/order.route')(app);
require('./src/routes/customer.route')(app);
require('./src/routes/phone.route')(app);



// app.use(require('@middlewares/error-handler'))


module.exports = app