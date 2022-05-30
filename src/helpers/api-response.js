module.exports = {
    send: function( response, params ) {
        let statusCode = params.status || 200;
        let success = params.success || false;
        let message = params.message || '';
        let data = params.data || [];
        let errors = params.errors || '';

        send = {
            success: success,
            status: statusCode,
            message: message,
            errors: errors,
            data: data
        }

        if( typeof params.tokenExpired !== 'undefined')
        send.tokenExpired = params.tokenExpired || false;

        response.status(statusCode).send(send);
    }
}