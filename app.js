require('dotenv').config();
const EXPRESS = require('express');
const path = require('path');
const cors = require('cors')
const moment = require('moment-timezone')

const app = new EXPRESS()

const db = require('/models');

db.sequelize.sync();


moment.tz.setDefault('Asia/Manila')




app.use(cors({
    origin: '*'
}))


app.use('/api/static', EXPRESS.static(path.join(__dirname, 'uploads')));


app.use(EXPRESS.json({limit: '100mb'}))

app.use(EXPRESS.urlencoded({ extended: false, limit: '100mb' }))

app.get('/api', (req, res) => {
    res.send("Hello World!")
});

// // Register all routes
require('./src/routes/auth.route')(app);
require('./src/routes/user.route')(app);



// app.use(require('@middlewares/error-handler'))

let port = process.env.PORT || 4230
app.listen(port, () => console.log(`server is running on port ${port}`))

// module.exports = app
