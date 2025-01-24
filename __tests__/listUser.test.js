import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../server.js";
import User from "../models/user.model.js";
import { before } from "lodash";
// Pass supertest agent for each test
// const agent = request.agent(app);

jest.mock("../models/user.model.js");


// let server;

// beforeAll(async () => {
//   server = app.listen(5001); // Start the server on port 5000
// });

// afterAll(async () => {
//   await server.close(); // Make sure to close the server after tests are done
// });

jest.mock("express-jwt", () => {
  return {
    expressjwt: jest.fn().mockImplementation((options) => {
      return (req, res, next) => {
        req.auth = { userId: "mockedUserId" }; // Mock user data
        next(); // Call the next middleware
      };
    }),
  };
});

let mongoServer;

describe("GET /users", () => {
  it("should return a list of users", async () => {
    // Mock the return value of User.find()
    const mockUsers = [
      {
        fullName: "a, b",
        username: "a",
        email: "a@a.com",
        password: "123456",
      },
      {
        fullName: "b, c",
        username: "b",
        email: "b@b.com",
        password: "123456",
      },
    ];

    const resvd = User.find.mockResolvedValue(mockUsers);



    console.log(resvd);
    
    const res = await request(app).get("/users");

    console.log(res);
    
    

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockUsers);
  });

  it('should return an error if no users are found', async () => {
      User.find.mockResolvedValue([]); // Mock an empty result (no users in DB)

      const res = await request(app).get('/users');

      expect(res.status).toBe(400);
      expect(res.body).toBe('No users found in the database');
  });

  it('should return a 500 error if an exception occurs', async () => {
      User.find.mockRejectedValue(new Error('Database error')); // Mock a database error

      const res = await request(app).get('/users');

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Internal server error');
  });
});
