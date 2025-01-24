# API Documentation

# To-Do-List-REST-API--Civic-Voices- API Documentation

## Introduction

Welcome to the **Todo API**. This API allows users to authenticate, manage their todos, and interact with their tasks.

### Features

- **User Authentication**: Register and log in users with email and password.
- **Todos Management**: Authenticated users can create, view, update, and delete their own todos.

## Getting Started

### Prerequisites

- Node.js (LTS version)
- Postman or any API testing tool
- A code editor like VSCode

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/MamaiTheCoder/To-Do-List-REST-API--Civic-Voices-.git

cd To-Do-List-REST-API--Civic-Voices-

npm install
```

### Setup

- Create an .env file by copying the .env.example file:
Note: replace the the angle brackets with actuall values from mongoDB atlas
[instructions on how to use mongoDB](https://www.mongodb.com/resources/products/fundamentals/mongodb-connection-string)
- Open the terminal and generate secret key with `openssl rand -base64 32`(\*\*optional).

```
MONGO_DB_URI=mongodb+srv://<your username>:<your password>@cluster0.vnabx.mongodb.net/<your database name>?retryWrites=true&w=majority&appName=Cluster0
PORT=<port you want the api to run on>
JWT_SECRET=<set your secret key>
```

cp .env.example .env

### Running Locally

Start the API locally by running:

`npm start`

## Authentication

This API uses JWT for authentication. After logging in, use the token provided.

### API Endpoints

#### POST /api/v1/users

Description: Create a new user.
Request Body:
json
```
{
"name": "John Doe",
"email": "john.doe@example.com"
}
```
Response Example:
json
```
{
"status": "success",
"data": { "id": 3, "name": "John Doe", "email": "john.doe@example.com" }
}
```
#### GET /api/v1/users

Description: Get a list of all users.

Response Example:
json
Copy
{
"status": "success",
"data": [
{ "id": 1, "name": "test user1" },
{ "id": 2, "name": "test user2" }
]
}

### Error Codes

200 OK: Successful request.
201 Ok: created
400 Bad Request: Invalid request data.
401 Unauthorized: Missing or invalid token.
404 Not Found: Resource not found.
500 Internal Server Error: Server error.

Versioning
The current API version is v1. You can access it with /api/v1/.

## Authentication

This API uses JWT (JSON Web Tokens) for authentication.
You must authenticate with your email and password to access protected routes (such as creating or viewing todos).
Note: your credentials will be validated.

### Register User

URL: /api/v1/auth/register
Method: POST
Description: Register a new user with an email and password.
Request Body:
json

```
{
    fullName: "test user"
    "email": "user@example.com",
    "password": "yourpassword123"
}
```

Response Example:
json

```
{
    "status": "success",
    "message": "User registered successfully"
}
```

Error Handling:
400 Bad Request: Invalid email or password format.
409 Conflict: User already exists.

### Login User

URL: /api/v1/auth/login
Method: POST
Description: Log in an existing user to receive a JWT token.
Request Body:
json

```
{
    "email": "user@example.com",
    "password": "yourpassword123"
}
```

Response Example:
json

```
{
    "status": "success",
    "token": "your-jwt-token-here"
}
```

Error Handling:
- 401 Unauthorized: Invalid email or password.

## Protecting Routes

To access protected routes (such as creating or viewing todos), you must include the JWT token in authorization Bearer token.

## Todos Management

Once authenticated, users can perform CRUD operations on their todos.

### Create a Todo
URL: /api/v1/todos/new/:userId
Method: POST
Description: Create a new todo.
Authorization in postman: Bearer token
Request Body:
json

```
{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread"
}
```
Response Example:
json
```
{
    "status": "success",
    "data": {
        "id": 1,
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "completed": false,
        "createdAt": "2025-01-24T12:00:00Z"
    }
}
```

#### Error Handling:
- 400 Bad Request: Missing required fields.
- 401 Unauthorized: Missing or invalid JWT token.

### Get All Todos
URL: /api/v1/tasks/by/:userId'
Method: GET
Description: Get a list of all the todos for the authenticated user.
Authorization: Bearer token in postman
Response Example:
json
```
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "title": "Buy groceries",
            "description": "Milk, eggs, bread",
            "completed": false,
            "createdAt": "2025-01-24T12:00:00Z"
        },
        {
            "id": 2,
            "title": "Study JavaScript",
            "description": "Complete the Express.js tutorial",
            "completed": true,
            "createdAt": "2025-01-23T09:00:00Z"
        }
    ]
}
```
#### Error Handling:
- 401 Unauthorized: Missing or invalid JWT token.

### Get a Single Todo
URL: /api/v1//tasks/:taskId/users/:userId
Method: GET
Description: Get a specific todo by its ID.
Authorization: Bearer token in postman
Response Example:
json
```
{
    "status": "success",
    "data": {
        "id": 1,
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "completed": false,
        "createdAt": "2025-01-24T12:00:00Z"
    }
}
```
#### Error Handling:
- 401 Unauthorized: Missing or invalid JWT token.
- 404 Not Found: Todo not found.

### Update a Todo
URL: /api/v1/todos/:id
Method: PUT
Description: Update a specific todo.
Request Headers:
Authorization: Bearer token in postman
Request Body:
json
```
{
    "title": "Buy groceries and more",
    "description": "Milk, eggs, bread, and vegetables"
}
```
Response Example:
json
```
{
    "status": "success",
    "data": {
        "id": 1,
        "title": "Buy groceries and more",
        "description": "Milk, eggs, bread, and vegetables",
        "completed": false,
        "createdAt": "2025-01-24T12:00:00Z"
    }
}
```
#### Error Handling:
- 400 Bad Request: Invalid data.
- 401 Unauthorized: Missing or invalid JWT token.
- 404 Not Found: Todo not found.

### Delete a Todo
URL: /api/v1/tasks/:taskId/users/:userId
Method: DELETE
Description: Delete a specific todo.
Authorization: Bearer token in postman
Response Example:
json
```
{
    "status": "success",
    "message": "Todo deleted successfully"
}
```
### Error Handling:
- 401 Unauthorized: Missing or invalid JWT token.
- 404 Not Found: Todo not found.
Error Codes
- 200 OK: Successful request.
- 400 Bad Request: Invalid request data.
- 401 Unauthorized: Missing or invalid JWT token.
- 404 Not Found: Resource not found (e.g., todo).
- 409 Conflict: User already exists (during registration).
- 500 Internal Server Error: Server error.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
