module.exports = {
	save: async function(params) {

		// Helper declarations
		const API_RESPONSE = require('../helpers/api-response');

		// Model declarations
		const USER_REFERENCE_MODEL = require("../models/user-reference");
		console.log("RDB params", params);

		// Let's go
		try {
			// Preparations
			params.body = {}
			params.body.user_id = params.currentUser.user_id;
			params.body.type = params.currentUser.role;
			params.body.username = params.currentUser.Username;
			params.body.reference_1 = params.currentUser.UserAttributes[0].Value;
			params.body.reference_2 = params.currentUser.UserAttributes[1].Value;


			params.insertSql = await USER_REFERENCE_MODEL.prepareSave(params);
			
			// Insert user references if not yet exist.
			await USER_REFERENCE_MODEL.insert(params);
			console.log('User Reference successfully saved.')
		}  catch( error ) {
			console.log('Error', error)
		}
	},
}