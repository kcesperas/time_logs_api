module.exports = {
    send: function( response, params ) {

        console.log(params);

        let statusCode = params.status || 200;
        let status = params.status || false;
        let success = params.success || false;
        let message = params.message || '';
        let data = params.data || [];

        response.status(statusCode).send({
            success: success,
            status: statusCode,
            message: message,
            data: data
        })
    }
}