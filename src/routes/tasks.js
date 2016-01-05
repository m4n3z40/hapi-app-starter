import Joi from 'joi';
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
        handler: tasksHandlers.create,
        config: {
            validate: {
                payload: {
                    id: Joi.number(),
                    description: Joi.string().required(),
                    done: Joi.boolean().required()
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/tasks/{id}',
        handler: tasksHandlers.update,
        config: {
            validate: {
                payload: {
                    id: Joi.number().required(),
                    description: Joi.string().required(),
                    done: Joi.boolean().required()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/tasks/{id}',
        handler: tasksHandlers.remove
    }
];
