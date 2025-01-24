import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from '../server.js'

// Create a mock for express-jwt
// jest.mock('express-jwt', () => jest.fn().mockImplementation((options) => (req, res, next) => {
//     req.auth = { userId: 'testuser123' };  // Simulate an authenticated user
//     next();
// }));

jest.mock('express-jwt', () => {
  return {
    expressjwt: jest.fn().mockImplementation((options) => {
      return (req, res, next) => {
        req.auth = { userId: 'mockedUserId' }; // Mock user data
        next(); // Call the next middleware
      };
    }),
  };
});


let mongoServer;


// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const mongoUri = mongoServer.getUri();
  
//   // Connect mongoose to the in-memory database
//   await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
// });

// afterAll(async () => {
//   // Ensure database is properly dropped and connection is closed
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
  
//   // Stop the MongoMemoryServer
//   await mongoServer.stop();
// });

describe("POST /users", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
  it("should successfully sign up a new user", async () => {
    const newUser = {
        fullName: "test user",
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
    };
    
    const response = await request(app).post('/users').send(newUser);

    expect(response.status).toBe(201);  // Expect a 201 Created response
    expect(response.body.message).toBe('Successfully signed up!');
  });
  it('should return 500 for invalid data', async () => {
    const invalidUser = {
      fullName: '',
      username: '',  // Invalid because username is required
      email: 'invalidemail',  // Invalid email format
      password: 'short',  // Too short password (assuming you have validation)
    };

    // Make a POST request with invalid data
    const response = await request(app)
      .post('/users')
      .send(invalidUser);

    // Assert that the response has the correct status code and error message
    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();  // Ensure an error message is returned
  });
});
