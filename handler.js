const SERVERLESS = require('serverless-http')
const Application = require('./app')

const db = require('./models');

db.sequelize.sync(
    // {force: true}
    ).then(() => { 
    // initial();
    console.log('DB Connected!')
  });


module.exports.httpService = SERVERLESS(Application);
// module.exports.handler = async(event, context) => {
//     return await SERVERLESS(Application)(event, context)
// }