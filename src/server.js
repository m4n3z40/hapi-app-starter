import Hapi from 'hapi';
import serverConfig from './configs/server';
import tasksRoutes from './routes/tasks';

const server = new Hapi.Server();

server.connection(serverConfig);

server.route(tasksRoutes);

server.start(err => {
    if (err) {
        throw err;
    }

    console.log('Server running at: ', server.info.uri);
});
