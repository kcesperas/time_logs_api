require('dotenv').config();
// const handlebars = require('express-handlebars')
// require('module-alias/register')
const EXPRESS = require('express')
const cors = require('cors')
const moment = require('moment-timezone')
const port = process.env.API_PORT;


// const swaggerUi = require('swagger-ui-express')
// const swaggerUI = require('swagger-ui-express')
// const swaggerJSDoc = require('swagger-jsdoc')


console.log(port)
const app = new EXPRESS()
// const swaggerSpecs = swaggerJSDoc(require('@config/documentation'))

var AWS = require('aws-sdk');
////AWS CONFIG////
AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION
});


moment.tz.setDefault('Asia/Manila')

app.use(cors())
app.use(EXPRESS.json())
app.use(EXPRESS.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    console.log('Welcome to AJA Order Taker API')
})





// Register all routes
require('./src/routes/auth.route')(app);


// app.use(require('@middlewares/error-handler'))


// app.listen(port, function () {
// 	console.log('\x1b[33m%s\x1b[0m', '* Express Development is listening on localhost:'+port+', open your browser on http://localhost:'+port+' *');
// });
module.exports = app