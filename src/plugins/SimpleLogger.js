const SimpleLogger = {
    register(server, options, next) {
        server.settings.debug = {
            log: ['hapi', 'info', 'error', 'warn', 'debug'],
            request: ['hapi', 'info', 'error', 'warn', 'debug']
        };

        server.ext('onPreResponse', function onPreResponseExtension(request, reply) {
            request.log(['info'], 'at ' + request.path + ' - Response sent - ' + new Date());

            return reply.continue();
        });

        next();
    }
};

SimpleLogger.register.attributes = {
    name: 'SimpleLogger',
    version: '0.0.1'
};

export default SimpleLogger;
