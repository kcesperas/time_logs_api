
function verifyAdminToken(req, res, next) {
	const IDMS_MODEL = require('../../src/models/idms')
	const TEXT_HELPER = require('../helpers/text')
	const API_RESPONSE = require('../helpers/api-response');


	try {
		if ( TEXT_HELPER.isEmpty(req.headers['authorization']) ) {
			API_RESPONSE.send(res, {
				'status': 401,
				'success': false,
				'message': 'You are not authorized.',
			});
		}
		
		
		let results = IDMS_MODEL.validate(token);
		next();

	} catch( error ) {
		throw error;
	}
}

module.exports = verifyAdminToken;