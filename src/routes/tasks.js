import * as tasksHandlers from '../handlers/tasks';

export default [
    {
        method: 'GET',
        path: '/tasks/{id}',
        handler: tasksHandlers.findOne
    },
    {
        method: 'GET',
        path: '/tasks',
        handler: tasksHandlers.findAll
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: tasksHandlers.create
    },
    {
        method: 'PUT',
        path: '/tasks/{id}',
        handler: tasksHandlers.update
    },
    {
        method: 'DELETE',
        path: '/tasks/{id}',
        handler: tasksHandlers.remove
    }
];
