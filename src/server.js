import Hapi from 'hapi';
import serverConfig from './configs/server';
import SimpleLogger from './plugins/SimpleLogger';
import tasksRoutes from './routes/tasks';

const server = new Hapi.Server();

// Configuring server connection
server.connection(serverConfig);

// Registering routes
// TODO: make this automatic
server.route(tasksRoutes);

/**
 * Start server, we expose this to start the server else where
 *
 * @param {function} done a callback to be executed when server hast finished starting
 * @returns {Hapi.Server}
 */
export default function start(done) {
    // Registering plugins
    // TODO: make this automatic, maybe?
    server.register({register: SimpleLogger}, (err) => {
        if (err) {
            return done(err);
        }

        server.start(err => {
            if (err) {
                return done(err);
            }

            if (process.send) {
                process.send('online');
            }

            console.log('Server running at: ', server.info.uri);

            done();
        });
    });

    return server;
}

