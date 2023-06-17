import request from "supertest";
import app from "./app";
import mongoose from "mongoose";
import { User } from "./model/users";
import { MessagesTin } from "./model/msg";
const databaseTest = "Newtest";
const mongoURI = `mongodb://localhost:27017/${databaseTest}`;

describe("Users tests", () => {
  beforeAll(async () => {
    try {
      await mongoose.connection.close();
      await mongoose.connect(mongoURI);
    } catch (error) {
      console.log(error, "before Error");
    }
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.connection.close();
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

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedData);
  });

  it("should get a user by userId", async () => {
    const user = await User.create({
      email: "test@test.com",
      password: "password123",
    });
    const response = await request(app).get(`/user/${user._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      _id: user._id.toString(),
      ownerName: null,
      dogName: null,
      dogAge: null,
      ownerAge: null,
      gender: null,
      avatar: null,
      about: null,
      matches: [],
    });
  });

  it("should update a user's match", async () => {
    const user1 = await User.create({
      email: "user1@test.com",
      password: "password123",
    });

    const user2 = await User.create({
      email: "user2@test.com",
      password: "password123",
    });

    user1.matches.push(user2._id);
    await user1.save();

    const response = await request(app)
      .put("/addmatch")
      .send({ userId: user1._id, matchedUserId: user2._id });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    const updatedUser1 = await User.findById(user1._id);
    expect(updatedUser1?.matches).toContainEqual(user2._id);
  });

  it("should return matched users", async () => {
    const user1 = await User.create({
      email: "user1@test.com",
      password: "password123",
    });

    const user2 = await User.create({
      email: "user2@test.com",
      password: "password123",
    });

    user1.matches.push(user2._id);
    await user1.save();

    const response = await request(app)
      .get("/matchedusers")
      .query({ userIds: JSON.stringify([user1._id.toString()]) });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]._id).toBe(user1._id.toString());
  });
});
describe("Messages test", () => {
  let user1: any;
  let user2: any;
  beforeAll(async () => {
    try {
      await mongoose.connection.close();
      await mongoose.connect(mongoURI);
      user1 = await User.create({
        email: "user1@test.com",
        password: "password123",
      });

      user2 = await User.create({
        email: "user2@test.com",
        password: "password123",
      });
    } catch (error) {
      console.log(error);
    }
  });
  afterAll(async () => {
    await User.deleteMany();
    await MessagesTin.deleteMany();
    await mongoose.connection.close();
  });
  it("should add a new message", async () => {
    const newMessage = {
      fromUser: user1._id,
      toUser: user2._id,
      message: "New message",
    };

    const response = await request(app).post("/message").send(newMessage);

    expect(response.status).toBe(201);
    console.log(response.body.data);
    expect(response.body.data.message).toBe(newMessage.message);

    const insertedMessage = await MessagesTin.findOne(newMessage);
    expect(insertedMessage).toBeDefined();
  });
  it("should get messages between two users", async () => {
    await MessagesTin.create({
      fromUser: user1._id,
      toUser: user2._id,
      message: "Hello User2",
    });

    await MessagesTin.create({
      fromUser: user2._id,
      toUser: user1._id,
      message: "Hi User1",
    });
    const response = await request(app).get("/messages").send({
      fromUser: user1._id,
      toUser: user2._id,
    });
    console.log(response.body.data);
    expect(response.status).toBe(201);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body).toEqual({
      message: "ok",
      data: response.body.data,
    });
  });
});
