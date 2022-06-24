const SERVERLESS = require('serverless-http')
const Application = require('./app')





module.exports.httpService = SERVERLESS(Application);
// module.exports.handler = async(event, context) => {
//     return await SERVERLESS(Application)(event, context)
// }