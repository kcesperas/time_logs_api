// const db = require("../../models");
// const Payments = db.payments;
// const bodyParser = require('body-parser');

// const Op = db.Sequelize.Op;

// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcryptjs");
// // const payments = require("../../models/payments");

// // const { validateLoginData } = require('../utils/validators')
// // const { validateSignupData } = require('../utils/validators')

// app.use(bodyParser.urlencoded(options));

// exports.createRecord = async (req, res) => {
//   let params = {}
//   params.body = req.body;

//   // Let's go
//   try {
      

//       // Preparations
//       params.insertSql = await Payments.createRecord({params});

//       // Perform Query
//       let results = await Payments.save(params);
      
//       API_RESPONSE.send(res, {
//           'status': 201,
//           'success': true,
//           'message': 'Record successfully created.',
//           'data': results,
//       });
//   }  catch( error ) {
//       console.log('Saving Error')
//       console.log(error)
//       API_RESPONSE.send(res, {
//           'status': error.code ? error.code : 500,
//           'success': false,
//           'message': error.message,
//       });
//   }
// };







// exports.updateRecordById = async (req, res) => {
//   async (req, res, next) => {

//     let params = {};
//     params.body = req.body;
//     let payments_id = parseInt( req.params.id || 0);
//     params.conditions = {
//         "id": payments_id
//     }

//     if ( !params.conditions.id ) {
//         API_RESPONSE.send(res, {
//             'status': 404,
//             'success': false,
//             'message': 'Unable to process request.',
//         });
//         return;
//     }
    
//     try {
//         // Preparations
//         params.setSql = await Payments.prepareUpdate(params);
        
//         // Perform Query
//         let results = await Payments.update(params);
        
//         API_RESPONSE.send(res, {
//             'status': 200,
//             'success': true,
//             'message': 'Record successfully updated.',
//             'data': results,
//         });
//     }  catch( error ) {
//         API_RESPONSE.send(res, {
//             'status': error.code ? error.code : 500,
//             'success': false,
//             'message': error.message,
//         });
//     }
// }};


// exports.getAllRecords = async (req, res) => {


//   async (req, res, next) => {

//     let params = await Payments.prepare(req);

//     try {
//         let results = await Payments.get(params);
        
//         API_RESPONSE.send(res, {
//             'status': 200,
//             'success': true,
//             'message': 'Data successfully retrieved.',
//             'data': results,
//         })
//     }  catch( error ) {
//         API_RESPONSE.send(res, {
//             'status': error.code ? error.code : 500,
//             'success': false,
//             'message': error.message,
//         });
//     }
// };


// exports.getRecordById = async (req, res) => {
//   async (req, res, next) => {
    

//     let params = await Payments.prepare(req);
//     params.conditions = {
//         "id": parseInt(req.params.id || 0)
//     }

//     try {
//         let results = await Payments.getOne(params);
//             if(results.length == 0){
//                return API_RESPONSE.send(res, {
//                     'status': 400,
//                     'success': true,
//                     'message': "Can't Find Record.",
//                     'data': [],
//                 });
//             } 


//         API_RESPONSE.send(res, {
//             'status': 200,
//             'success': true,
//             'message': 'Data successfully retrieved.',
//             'data': results,
//         });
//     }  catch( error ) {
//         API_RESPONSE.send(res, {
//             'status': error.code ? error.code : 500,
//             'success': false,
//             'message': error.message,
//         });
//     }
// };
// exports.deleteRecordById = async (req, res) => {

//   async (req, res, next) => {

//     let params = {};
//     params.id = req.params.id || 0;
//     // Validataion
    
//     try {
//          // Preparations
//          params.deleteSql = await Payments.prepareDelete(params);

//         // Perform Query
//         let results = await Payments.delete(params);
//             console.log(results)
//         API_RESPONSE.send(res, {
//             'status': 200,
//             'success': true,
//             'message': 'Record successfully deleted.',
//             'data': results,
//         });
//     }  catch( error ) {
//         console.log(error)
//         API_RESPONSE.send(res, {
//             'status': error.code ? error.code : 500,
//             'success': false,
//             'message': error.message,
//         });
//       }
//     }}
//   }}
