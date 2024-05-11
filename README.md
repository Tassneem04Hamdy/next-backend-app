## Running the server

1. Open a terminal, navigate to the project's directory, and run the following command to install the needed packages:
``` bash
npm i
```

2. Create a `.env` file in the project's root directory and fill in the data according to the `.env.example` file.

3. Run the server through:
``` bash
npm run dev
```

> Server runs on [http://localhost:3000](http://localhost:3000)

<br/>

## API Endpoints

| HTTP Method | Endpoint | Required fields | Optional fields | Action | Response |
| :---------- | :------- | :-------------- | :-------------- | :----- | :------- |
| GET    | /api/users | None | None | Get all Users | - `users` array |
| GET    | /api/users/:userId | None | None | Get data of specific User | - `user` object |
| POST   | /api/users | - username: string <br/> - password: string | None | Create a new User | - The created `user` object |
| DELETE | /api/users/:userId | None | None | Delete specific User and all his Tasks | - 'User is successfully deleted.' message |
| POST   | /api/users/:userId/tasks | - title: string <br/> - description: string | None | Create new Task for a specific User | - The created `task` object |
| GET   | /api/users/:userId/tasks | None | None | Get All Tasks of specific User | - `tasks` array |
| GET   | /api/users/:userId/tasks/:taskId | None | None | Get specific Task of specific User | - `task` object |
| PATCH  | /api/users/:userId/tasks/:taskId | None | - title: string <br/> - description: string <br/> - status: boolean | Edit Task | - The updated `task` object |
| DELETE | /api/users/:userId/tasks/:taskId | None | None | Remove Task from User's Tasks | - 'Task is successfully deleted.' message |

<br/>

## Returned objects format

``` js
user = {
    id,
    username,
    tasks: [
        {
            _id,
            title,
            description,
            status,
            createdAt,
            updatedAt,
        }
    ],
}
```

``` js
users = [
    {
        id,
        username,
        tasks: [
            {
                _id,
                title,
                description,
                status,
                createdAt,
                updatedAt,
            },
            etc...
        ],
    },
    etc...
]
```

``` js
task = {
    _id,
    title,
    description,
    status,
    createdAt,
    updatedAt,
}
```

``` js
tasks = [
    {
        _id,
        title,
        description,
        status,
        createdAt,
        updatedAt,
    },
    etc...
]
```
