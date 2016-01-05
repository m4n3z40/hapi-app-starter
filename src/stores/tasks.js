const tasks = [
    {
        id: 1,
        description: 'Get milk.',
        done: false
    },
    {
        id: 2,
        description: 'Study Hapi.',
        done: false
    },
    {
        id: 3,
        description: 'Go to the dentist on thursday.',
        done: false
    }
];

export function findById(taskId) {
    const nTaskId = Number(taskId);

    const foundTask = tasks.filter(task => task.id === nTaskId)[0];

    if (!foundTask) {
        return Promise.reject(new Error('Task not found'));
    }

    return Promise.resolve(foundTask);
}

export function getAll() {
    return Promise.resolve(tasks);
}

export function remove(taskId) {
    const nTaskId = Number(taskId);

    const removed = tasks.some((task, i) => {
        if (task.id === nTaskId) {
            tasks.splice(i, 1);

            return true;
        }

        return false;
    });

    if (!removed) {
        return Promise.reject(new Error('No task was deleted'));
    }

    return Promise.resolve();
}

export function save(task) {
    return findById(task.id)
        .then(existingTask => {
            /* eslint-disable no-param-reassign */
            existingTask.description = task.description;
            existingTask.done = task.done;
            /* eslint-enable no-param-reassign */

            return existingTask;
        })
        .catch(() => {
            const taskCopy = Object.assign({}, task, {id: tasks.length + 1});

            tasks.push(taskCopy);

            return Promise.resolve(taskCopy);
        });
}
