/**
 * Tasks mocked data
 *
 * @type {*[]}
 */
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

/**
 * Find a task by its ID
 *
 * @param {number} taskId
 * @returns {Promise} a promise that resolves if task is found and rejects it when is not
 */
export function findById(taskId) {
    const nTaskId = Number(taskId);

    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            const foundTask = tasks.filter(task => task.id === nTaskId)[0];

            if (!foundTask) {
                return reject(new Error('Task not found'));
            }

            return resolve(foundTask);
        });
    });
}

/**
 * Get all tasks available
 *
 * @returns {Promise} simulates an async operation returning by a promise
 */
export function getAll() {
    return new Promise(resolve => {
        process.nextTick(() => {
            resolve(tasks);
        });
    });
}

/**
 * Removes a task
 *
 * @param {number} taskId the task id
 * @returns {Promise} simulates an async operation returning by a promise
 */
export function remove(taskId) {
    const nTaskId = Number(taskId);

    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            const removed = tasks.some((task, i) => {
                if (task.id === nTaskId) {
                    tasks.splice(i, 1);

                    return true;
                }

                return false;
            });

            if (!removed) {
                return reject(new Error('No task was deleted'));
            }

            resolve();
        });
    });
}

/**
 * Saves a task
 *
 * @param {Object} task task data to save
 * @returns {Promise} simulates an async operation returning by a promise
 */
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
