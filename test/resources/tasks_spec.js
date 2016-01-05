var frisby = require('frisby');

var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 8080;
var URL = 'http://' + HOST + ':' + PORT + '/';

/******************************************************************
 *               TESTING: GET ALL TASKS - GET /tasks
 ******************************************************************/

frisby.create('GET tasks')
    .get(URL + 'tasks')
    .expectStatus(200)
    .expectJSONTypes({
        code: Number,
        message: String,
        data: Array
    })
    .expectJSON({
        code: 200,
        message: "Tasks found successfully",
        data: [
            {
                id: 1,
                description: "Get milk.",
                done: false
            },
            {
                id: 2,
                description: "Study Hapi.",
                done: false
            },
            {
                id: 3,
                description: "Go to the dentist on thursday.",
                done: false
            }
        ]
    })
    .toss();

/******************************************************************
 *               TESTING: GET ONE TASK - GET /tasks/{id}
 ******************************************************************/

frisby.create('GET task with id 1')
    .get(URL + 'tasks/1')
    .expectStatus(200)
    .expectJSONTypes({
        code: Number,
        message: String,
        data: Object
    })
    .expectJSON({
        code: 200,
        message: "Task found successfully",
        data: {
            id: 1,
            description: "Get milk.",
            done: false
        }
    })
    .toss();

/******************************************************************
 *               TESTING: CREATE A TASK - POST /tasks
 ******************************************************************/

frisby.create('POST create a task')
    .post(URL + 'tasks', {description: 'Do something else.', done: false})
    .expectStatus(200)
    .expectJSONTypes({
        code: Number,
        message: String,
        data: Object
    })
    .expectJSON({
        code: 200,
        message: "Task created successfully",
        data: {
            description: 'Do something else.',
            done: false
        }
    })
    .afterJSON(function(response) {
        expect(response.data.id).toEqual(jasmine.any(Number));
    })
    .toss();

/******************************************************************
 *               TESTING: UPDATE A TASK - PUT /tasks/{id}
 ******************************************************************/

frisby.create('PUT update a task')
    .put(URL + 'tasks/2', {
        id: 2,
        description: "Study Hapi.",
        done: true
    })
    .expectStatus(200)
    .expectJSONTypes({
        code: Number,
        message: String,
        data: Object
    })
    .expectJSON({
        code: 200,
        message: "Task updated successfully",
        data: {
            id: 2,
            description: "Study Hapi.",
            done: true
        }
    })
    .afterJSON(function() {
        frisby.create('GET check if task was updated')
            .get(URL + 'tasks/2')
            .expectStatus(200)
            .expectJSONTypes({
                code: Number,
                message: String,
                data: Object
            })
            .expectJSON({
                code: 200,
                message: "Task found successfully",
                data: {
                    id: 2,
                    description: "Study Hapi.",
                    done: true
                }
            })
            .toss();
    })
    .toss();

/******************************************************************
 *               TESTING: DELETE A TASK - DELETE /tasks/{id}
 ******************************************************************/

frisby.create('DELETE task with id 3')
    .delete(URL + 'tasks/3')
    .expectStatus(200)
    .expectJSONTypes({
        code: Number,
        message: String,
        data: Object
    })
    .expectJSON({
        code: 200,
        message: 'Task deleted successfully',
        data: null
    })
    .afterJSON(function() {
        frisby.create('GET check if task 3 was deleted')
            .get(URL + 'tasks/3')
            .expectStatus(404)
            .expectJSONTypes({
                code: Number,
                message: String,
                errors: Array
            })
            .toss();
    })
    .toss();
