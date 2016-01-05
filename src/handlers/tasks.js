import * as tasksStore from '../stores/tasks';

export function create(request, reply) {
    tasksStore.save(request.payload)
        .then(task => reply({
            code: 200,
            message: 'Task created successfully',
            data: task
        }));
}

export function update(request, reply) {
    tasksStore.save(request.payload)
        .then(task => reply({
            code: 200,
            message: 'Task updated successfully',
            data: task
        }));
}

export function remove(request, reply) {
    tasksStore.remove(Number(request.params.id))
        .then(() => reply({
            code: 200,
            message: 'Task deleted successfully',
            data: null
        }))
        .catch(err => reply({
            code: 404,
            message: err.message,
            errors: [err.message]
        }).code(404));
}

export function findOne(request, reply) {
    tasksStore.findById(Number(request.params.id))
        .then(task => reply({
            code: 200,
            message: 'Task found successfully',
            data: task
        }))
        .catch(err => reply({
            code: 404,
            message: err.message,
            errors: [err.message]
        }).code(404));
}

export function findAll(request, reply) {
    tasksStore.getAll()
        .then(tasks => reply({
            code: 200,
            message: 'Tasks found successfully',
            data: tasks
        }));
}
