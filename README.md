# API Documentation

# To-Do-List-REST-API--Civic-Voices- API Documentation

## Introduction

Welcome to the **Todo API**. This API allows users to authenticate, manage their todos, and interact with their tasks.

### Technologies
- Express.js
- typescript

### Project Structure
```
To-Do-List-REST-API--Civic-Voices-/
│
│
├── dist/                       	# Compiled JavaScript output
│   ├── controllers/            	# Compiled controllers
│   │   ├── auth.controllers.js
│   │   ├── task.controllers.js
│   │   ├── user.controllers.js
│   ├── db/                     	# Compiled DB files
|	|	├── connectToMongoDB.js
│   ├── helpers/                	# Compiled helpers
|	|	├── getMongooseObjectId.ts
│   ├── models/ 	                # Compiled models
|	|	├── task.model.js
|	|	├── user.model.js
│   ├── routers/	                # Compiled routers
|	|	├── auth.router.js
|	|	├── task.router.js
|	|	├── user.router.js
│   ├── types/ 	                 	# Compiled types
|	|	├── request.d.ts
|	|	├── response.d.ts
│   ├── server.js               	# Compiled server entry file (from server.ts)
│
├── node_modules/               	# Installed dependencies
├── src/                        	# TypeScript source code
│   ├── controllers/            	# Controllers (business logic)
│   │   ├── auth.controllers.ts
│   │   ├── task.controllers.ts
│   │   ├── user.controllers.ts
│   ├── db/                     	# Database connection
|	|	├── connectToMongoDB.ts
│   ├── helpers/                	# Helper functions
|	|	├── getMongooseObjectId.ts
│   ├── models/ 	                # Mongoose models
|	|	├── task.model.ts
|	|	├── user.model.ts
│   ├── routers/	                # API routers
|	|	├── auth.router.ts
|	|	├── task.router.ts
|	|	├── user.router.ts
│   ├── types/ 	                 	# Typescript types
|	|	├── request.d.ts
|	|	├── response.d.ts
│   ├── server.ts               	# server entry file
│
├── .env                        	# Environment variables
├── .gitignore                      # files ignored by git
├── package-lock.json
├── package.json               		# Project metadata and dependencies
├── README.md               		# Project documentation
├── tsconfig.json               	# TypeScript configuration
└── tsconfig.tsbuildinfo

```

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

- Create a .env file and copy the example below to it.
- Note: replace the the angle brackets with actual values from mongoDB atlas
- [instructions on how to use mongoDB](https://www.mongodb.com/resources/products/fundamentals/mongodb-connection-string)
- Open the terminal and generate secret key with `openssl rand -base64 32`(\*\*optional).

```
MONGO_DB_URI=mongodb+srv://<your username>:<your password>@cluster0.vnabx.mongodb.net/<your database name>?retryWrites=true&w=majority&appName=Cluster0
PORT=<port you want the api to run on>
JWT_SECRET=<set your secret key>
```

- if you have any issues connecting to the database try using the string below
```
MONGO_DB_URI=mongodb://<your username>:<db_password>@cluster0-shard-00-00.vnabx.mongodb.net:27017,cluster0-shard-00-01.vnabx.mongodb.net:27017,cluster0-shard-00-02.vnabx.mongodb.net:27017/<your database name>?ssl=true&replicaSet=atlas-8046u6-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
```

### Running Locally

Start the API locally by running:

`npm run dev`

## Points to note
- After making any change to the project in src folder, you need to run ```npm run build```.
- The dist folder contains project to be deployed locally or on the server.
- On the server run ```npm start```.

## User

This API performs CRUD operation to users.

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
#### PUT /api/v1/users/:userId

Description: update your user account.

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
#### DELETE /api/v1/users/:userId

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

### Login User

#### POST /api/v1/auth/login
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

#### GET /api/v1/auth/signout
- Description: sign outs an existing user and deletes the token.

Response Example:

```
{
    "message": "signed out"
}
```

## Protecting Routes

To access protected routes (such as creating or viewing todos), you must include the JWT token in authorization Bearer token.

## Todos Management

Once authenticated, users can perform CRUD operations on their todos.

### Create a Todo
#### POST /api/v1/tasks/new/:userId
- Description: Create a new todo.
- Authorization in postman: Bearer token
- Request Body:
```
{
	"title": "new",
	"description": "new todo"
}
```
- Response Example:
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
#### GET /api/v1/tasks/by/:userId'
- Description: Get a list of all the todos for the authenticated user.
- Authorization: Bearer token in postman
- Response Example:
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
#### GET /api/v1/tasks/:taskId/users/:userId
- Description: Get a specific todo by its ID.
- Authorization: Bearer token in postman
- Response Example:
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
#### PUT /tasks/:taskId/users/:userId
- Description: Update a specific todo.
- Authorization: Bearer token in postman
- Request Body
```
{
	"title": "change",
	"description": "new todo",
	"completed": true,
}
```
Response Example:
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
#### Error Handling:
- 400 Bad Request: Invalid data.
- 401 Unauthorized: Missing or invalid JWT token.
- 404 Not Found: Todo not found.

### Delete a Todo
#### DELETE /api/v1/tasks/:taskId/users/:userId
- Description: Delete a specific todo.
- Authorization: Bearer token in postman
- Response Example:
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

## Future Enhancements

Here are some planned features and improvements:

### 1. **Password Reset & Email Verification**
   - **Description**: Users will be able to reset their password via email and verify their email address during registration.
   - **Expected Outcome**: Enhanced user security and account recovery options.
   - **Implementation**: A link to reset the password will be sent to the user's email. Additionally, users will receive an email to verify their account before they can log in.

### 2. **User Profile Updates**
   - **Description**: Allow users to and and update profile picture.
   - **Expected Outcome**: A more personalized user experience.
   - **Implementation**: Users will be able to send a `PUT` request to update profile information.

### 3. **Task Categories and Priority Levels**
   - **Description**: Introduce task categories (e.g., "Work", "Personal", "Shopping") and priority levels (e.g., "Low", "Medium", "High").
   - **Expected Outcome**: Organize tasks better and allow users to filter tasks by category or priority.
   - **Implementation**: The `Task` model will include fields for `category` and `priority`. The frontend will allow users to select these options when creating or updating tasks.

### 4. **Task Due Dates and Reminders**
   - **Description**: Add due dates to tasks and set up reminders (e.g., via email or notifications).
   - **Expected Outcome**: Helps users keep track of important deadlines and stay on top of their tasks.
   - **Implementation**: Users can set due dates when creating or updating tasks. Reminders will be sent out before the due date.

### 5. **Task Comments & Collaboration**
   - **Description**: Allow users to add comments on tasks, creating a collaborative environment where multiple users can discuss tasks.
   - **Expected Outcome**: Improve team collaboration and communication within tasks.
   - **Implementation**: A new `Comment` model will be introduced, linked to tasks. Users can add, update, or delete comments.

### 6. **Rate-Limiting & API Security**
   - **Description**: Implement rate-limiting for certain API routes to prevent abuse and improve security.
   - **Expected Outcome**: Prevent users from making too many requests in a short period, protecting the server and enhancing user experience.
   - **Implementation**: Use libraries like [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) to control API access.

### 7. **Search Functionality**
   - **Description**: Add search functionality to allow users to find specific tasks by title, description, or keywords.
   - **Expected Outcome**: Provide users with an easier way to manage their tasks.
   - **Implementation**: Implement search functionality in the `GET /todos` route to filter tasks based on query parameters.

### 8. **User Roles & Permissions**
   - **Description**: Implement user roles such as `admin` and `user`, where admins have additional permissions (e.g., managing other users' tasks).
   - **Expected Outcome**: Introduce a role-based access control system for better management and security.
   - **Implementation**: Add a `role` field to the `User` model, and restrict access to certain routes based on the role.

### 9. **API Documentation with Swagger/OpenAPI**
   - **Description**: Generate comprehensive API documentation using tools like Swagger or OpenAPI, which will make it easier for developers to understand and interact with the API.
   - **Expected Outcome**: More accessible and user-friendly documentation for developers.
   - **Implementation**: Use libraries such as [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) to auto-generate API docs based on the code.

### 10. **Automated Testing**
   - **Description**: Implement automated tests for key routes and functionality using tools like [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest).
   - **Expected Outcome**: Improve code reliability and ensure the app works as expected across updates.
   - **Implementation**: Write unit and integration tests to verify the correct behavior of the API endpoints.


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
