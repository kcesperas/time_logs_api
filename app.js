require('dotenv').config();
const EXPRESS = require('express')
const cors = require('cors')
const moment = require('moment-timezone')

const app = new EXPRESS()


moment.tz.setDefault('Asia/Manila')

app.use(cors())
app.use(EXPRESS.json())
app.use(EXPRESS.urlencoded({ extended: true }))





// Register all routes
require('./src/routes/auth.route')(app);
require('./src/routes/user.route')(app);
<<<<<<< HEAD
require('./src/routes/payment.route')(app);
=======
require('./src/routes/tags.route')(app);
>>>>>>> d08519757952821f54c584b6a9cef8bacf3229b0



// app.use(require('@middlewares/error-handler'))


module.exports = app