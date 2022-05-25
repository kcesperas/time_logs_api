function verifyAdminToken(req, res, next) {
	console.log('verifyAdminToken triggered');
	next();
}

module.exports = verifyAdminToken;