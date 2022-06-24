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
require('./src/routes/auth.route')(app);
require('./src/routes/user.route')(app);
require('./src/routes/tags.route')(app);



// app.use(require('@middlewares/error-handler'))


module.exports = app