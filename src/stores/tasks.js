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
    const foundTask = tasks.filter(task => task.id === taskId)[0];

    if (!foundTask) {
        return Promise.reject(new Error('Task not found'));
    }

    return Promise.resolve(foundTask);
}

export function getAll() {
    return Promise.resolve(tasks);
}

export function remove(taskId) {
    const removed = tasks.some((task, i) => {
        if (task.id === taskId) {
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
    const existingTask = findById(task.id);

    if (existingTask) {
        existingTask.description = task.description;
        existingTask.done = task.done;

        return Promise.resolve(existingTask);
    }

    const taskCopy = Object.assign({}, task, {id: tasks.length + 1});

    tasks.push(taskCopy);

    return Promise.resolve(taskCopy);
}
