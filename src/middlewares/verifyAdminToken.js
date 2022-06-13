
async function verifyAdminToken(req, res, next) {
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
			return;
		}
		
		let token = req.headers['authorization'];
		let results = await IDMS_MODEL.validate(token, ['MBS Admin']);
		console.log('IDMS validate',results);
		if ( !TEXT_HELPER.isEmpty(results['status']) && results['status'] === 400 ) {
			API_RESPONSE.send(res, {
				'status': 400,
				'success': false,
				'message': results['message'],
			});
			return;
		} else {
			// Continue to handler
			req.currentUser = results.body.data;
			console.log('req.currentUser', req.currentUser)
			next();
		}

	} catch( error ) {
		console.log('IDMS error',error);
		let send = {
			'status': error.code ? error.code: 500,
			'success': false,
			'message': error.message ? error.message : 'Unable to processed request at this time. Please try again later.'
		};
		
		if ( typeof error.tokenExpired !== 'undefined') send.tokenExpired = error.tokenExpired ? true: false;

		API_RESPONSE.send(res, send );

		return;
	}
}

module.exports = verifyAdminToken;