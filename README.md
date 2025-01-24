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
	"fullName": "test  user",
	"username": "test",
	"email": "test@email.com",
	"password": "123456"
}
```
Response Example:
json
```
{
	"message": "Successfully signed up!"
}
```
#### GET /api/v1/users

Description: Get a list of all users.

Response Example:
json
```
[
	{
		"_id": "67921bf8e95272a5366b368f",
		"username": "testuser1",
		"email": "testuser1@example.com"
	},
	{
		"_id": "67921d2b18d1cb98269fbdaa",
		"username": "testuser2",
		"email": "testuser2@example.com"
	},
	{
		"_id": "67921df88747b118736f8ac2",
		"username": "testuser3",
		"email": "testuser3@example.com"
	},
]
```
#### GET /api/v1/users/:userId

Description: Get a single user.

Response Example:
json
```
{
	"_id": "6793808f44d43405f61719f0",
	"fullName": "e f",
	"username": "e",
	"email": "e@e.com",
	"created": "2025-01-24T11:59:11.689Z",
	"__v": 0
}
```
#### GET /api/v1/users/:userId

Description: Delete your user account.

Response Example:
json
```
{
	"_id": "6793808f44d43405f61719f0",
	"fullName": "e f",
	"username": "e",
	"email": "e@e.com",
	"created": "2025-01-24T11:59:11.689Z",
	"__v": 0
}
```

### Error Codes

- 200 OK: Successful request.
- 201 Ok: created
- 400 Bad Request: Invalid request data.
- 401 Unauthorized: Missing or invalid token.
- 403 Forbidden
- 404 Not Found: Resource not found.
- 500 Internal Server Error: Server error.

Versioning
The current API version is v1. You can access it with /api/v1/.

## Authentication

This API uses JWT (JSON Web Tokens) for authentication.
You must authenticate with your email and password to access protected routes (such as creating or viewing todos).
Note: your credentials will be validated.

### Register User

URL: /api/v1/users
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
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzODUwYTNlODFhODQ4MGRjZjA2NjUiLCJpYXQiOjE3Mzc3MjExMzh9.tnN9Vqj7NkU-hrnV2ti-ZXB5bYpLkC1nQ7Fhz5EWjOg",
	"user": {
		"_id": "6793850a3e81a8480dcf0665",
		"email": "f@f.com"
	}
}
```

Error Handling:
- 401 Unauthorized: Invalid email or password.

### Sign out

URL: /api/v1/auth/signout
Method: POST
Description: sign outs an existing user and deletes the token.
Request Body:
json

```
{

}
```

Response Example:
json

```
{
    "status": "success",
    "message": "signed out"
}
```

## Protecting Routes

To access protected routes (such as creating or viewing todos), you must include the JWT token in authorization Bearer token.

## Todos Management

Once authenticated, users can perform CRUD operations on their todos.

### Create a Todo
URL: /api/v1/tasks/new/:userId
Method: POST
Description: Create a new todo.
Authorization in postman: Bearer token
Request Body:
json

```
{
	"title": "new",
	"description": "new todo"
}
```
Response Example:
json
```
{
	"title": "new",
	"description": "new todo",
	"completed": false,
	"postedBy": "6793850a3e81a8480dcf0665",
	"_id": "679389f8a4029cefa8adc5a4",
	"created": "2025-01-24T12:39:20.247Z",
	"__v": 0
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
[
	{
		"_id": "679389a3a4029cefa8adc5a2",
		"title": "new",
		"description": "new todo",
		"completed": false,
		"postedBy": {
			"_id": "6793850a3e81a8480dcf0665",
			"username": "e",
			"email": "f@f.com"
		},
		"created": "2025-01-24T12:37:55.790Z",
		"__v": 0
	},
	{
		"_id": "679389f8a4029cefa8adc5a4",
		"title": "new",
		"description": "new todo",
		"completed": false,
		"postedBy": {
			"_id": "6793850a3e81a8480dcf0665",
			"username": "e",
			"email": "f@f.com"
		},
		"created": "2025-01-24T12:39:20.247Z",
		"__v": 0
	}
]
```
#### Error Handling:
- 401 Unauthorized: UnauthorizedError: No authorization token was found.

### Get a Single Todo
URL: /api/v1/tasks/:taskId/users/:userId
Method: GET
Description: Get a specific todo by its ID.
Authorization: Bearer token in postman
Response Example:
json
```
{
	"_id": "679389a3a4029cefa8adc5a2",
	"title": "new",
	"description": "new todo",
	"completed": false,
	"postedBy": {
		"_id": "6793850a3e81a8480dcf0665",
		"username": "e",
		"email": "f@f.com"
	},
	"created": "2025-01-24T12:37:55.790Z",
	"__v": 0
}
```
#### Error Handling:
- 401 Unauthorized: Missing or invalid JWT token.
- 404 Not Found: Todo not found.

### Update a Todo
URL: /tasks/:taskId/users/:userId
Method: PUT
Description: Update a specific todo.
Request Headers:
Authorization: Bearer token in postman
Request Body:
json
```
{
	"_id": "679389a3a4029cefa8adc5a2",
	"title": "change",
	"description": "new todo",
	"completed": true,
	"postedBy": "6793850a3e81a8480dcf0665",
	"created": "2025-01-24T12:37:55.790Z",
	"__v": 0,
	"updated": "2025-01-24T13:02:47.803Z"
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
	"message": "Task successfully deleted"
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
- 500 Internal Server Error: Server error.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
