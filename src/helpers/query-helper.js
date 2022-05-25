module.exports = {
	prepare: async function(req) {
		let f = '*', fields = '';
		if ( typeof req.query.fields !== 'undefined' || !req.query.fields) {
			f = req.query.fields
			fields = this.toFields(f)
		}

		let limit = parseInt(req.query.limit) || 0;
		let page = parseInt(req.query.page) || 1;
		var offset = (page - 1) * limit;

		return {
			fields: fields,
			limit: limit,
			offset: offset
		};
	},

	// Input: 
    toFields: function( text, seperator = ',', toArray = false ) {
		seperator = seperator || ' ';
		text = text || '*';
		text = text.replace(/,/g, seperator, -1);
	
		if ( toArray ) text = text ? text.split( seperator ) : [] ;
	
		return text;
	},
}