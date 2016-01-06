if (process.env.NODE_ENV !== 'production') {
    require('babel-register');
    require('babel-polyfill');
}

/* eslint-disable vars-on-top, no-var */
var startServer = require('./server').default;

// Starting server
var server = startServer(function doneCb(err) {
    if (err) {
        throw err;
    }
});
/* eslint-enable vars-on-top, no-var */

// We need this when working with multiple node instances
process.on('message', message => {
    if (message === 'shutdown') {
        server.stop();
        process.exit(0);
    }
});
