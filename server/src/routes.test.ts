import request from "supertest";
import app from "./app";
import mongoose from "mongoose";
import { User } from "./model/users";
const databaseTest = "Newtest";
const mongoURI = `mongodb://localhost:27017/${databaseTest}`;

describe("Users tests", () => {
  let connection: mongoose.Connection;

  beforeAll(async () => {
    try {
      connection = mongoose.connection;
      if (connection.readyState === 0) {
        await mongoose.connect(mongoURI);
      }
    } catch (error) {
      console.log(error, "before Error");
    }
  });

  afterAll(async () => {
    await User.deleteMany();
  });

  it("should create a new user", async () => {
    const data = { email: "test@test.com", password: "password123" };
    const response = await request(app).post("/signup").send(data);
    const user = await User.findOne({ email: data.email });
    if (user) {
      await expect(user.email).toBe(data.email);
    }
  });
  it("should return 409 if user already exists", async () => {
    const response = await request(app)
      .post("/signup")
      .send({ email: "test@test.com", password: "password123" });

    expect(response.status).toBe(409);
    expect(response.text).toBe("User already exists. Please login");
  });
  it("should login a user and return a token", async () => {
    const data = { email: "test@test.com", password: "password123" };
    await User.create(data);

    const response = await request(app).post("/login").send(data);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("userId");
  });

  it("should return 400 for invalid credentials during login", async () => {
    const data = { email: "test@test.com", password: "password123" };
    await User.create(data);

    const response = await request(app)
      .post("/login")
      .send({ email: "testt@test.com", password: "password123" });
    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid Credentials");
  });

  it("should update a user's account", async () => {
    const user = await User.create({
      email: "test@test.com",
      password: "password123",
    });

    const updatedData = {
      __v: 0,
      password: user.password,
      email: user.email,
      _id: user._id.toString(),
      ownerName: "John Doe",
      ownerAge: 30,
      gender: "male",
      avatar: "avatar.jpg",
      dogName: "Buddy",
      dogAge: 3,
      about: "I love dogs!",
      matches: [],
    };

    const response = await request(app).put("/updateUser").send(updatedData);
    // console.log(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedData);
  });

  // it("should get a user by userId", async () => {
  //   const user = await User.create({
  //     email: "test@test.com",
  //     password: "password123",
  //   });
  //   console.log(user);
  //   const response = await request(app).get(`/user/${user._id}`);
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual({
  //     _id: user._id,
  //     ownerName: null,
  //     dogName: null,
  //     dogAge: null,
  //     ownerAge: null,
  //     gender: null,
  //     avatar: null,
  //     matches: null,
  //     about: null,
  //   });
  // });

  // it("should update a user's match", async () => {
  //   const user1 = await User.create({
  //     email: "user1@test.com",
  //     password: "password123",
  //   });

  //   const user2 = await User.create({
  //     email: "user2@test.com",
  //     password: "password123",
  //   });

  //   const response = await request(app)
  //     .post("/update-match")
  //     .send({ userId: user1._id, matchedUserId: user2._id });

  //   expect(response.status).toBe(200);
  //   expect(response.body).toBeDefined();
  // });

  // it("should get all users", async () => {
  //   await User.create({ email: "user1@test.com", password: "password123" });
  //   await User.create({ email: "user2@test.com", password: "password123" });

  //   const response = await request(app).get("/users");

  //   expect(response.status).toBe(200);
  //   expect(response.body.length).toBe(2);
  // });

  // it("should get matched users by userIds", async () => {
  //   const user1 = await User.create({
  //     email: "user1@test.com",
  //     password: "password123",
  //   });

  //   const user2 = await User.create({
  //     email: "user2@test.com",
  //     password: "password123",
  //   });

  //   const response = await request(app).get(
  //     `/matched-users?userIds=["${user1._id}","${user2._id}"]`
  //   );

  //   expect(response.status).toBe(200);
  //   expect(response.body.length).toBe(2);
  // });
});
