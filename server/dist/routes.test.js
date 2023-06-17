"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = require("./model/users");
const databaseTest = "Newtest";
const mongoURI = `mongodb://localhost:27017/${databaseTest}`;
describe("Users tests", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            connection = mongoose_1.default.connection;
            if (connection.readyState === 0) {
                yield mongoose_1.default.connect(mongoURI);
            }
        }
        catch (error) {
            console.log(error, "before Error");
        }
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield users_1.User.deleteMany();
    }));
    it("should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { email: "test@test.com", password: "password123" };
        const response = yield (0, supertest_1.default)(app_1.default).post("/signup").send(data);
        const user = yield users_1.User.findOne({ email: data.email });
        if (user) {
            yield expect(user.email).toBe(data.email);
        }
    }));
    it("should return 409 if user already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/signup")
            .send({ email: "test@test.com", password: "password123" });
        expect(response.status).toBe(409);
        expect(response.text).toBe("User already exists. Please login");
    }));
    it("should login a user and return a token", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { email: "test@test.com", password: "password123" };
        yield users_1.User.create(data);
        const response = yield (0, supertest_1.default)(app_1.default).post("/login").send(data);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("userId");
    }));
    it("should return 400 for invalid credentials during login", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { email: "test@test.com", password: "password123" };
        yield users_1.User.create(data);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send({ email: "testt@test.com", password: "password123" });
        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid Credentials");
    }));
    it("should update a user's account", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield users_1.User.create({
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
        const response = yield (0, supertest_1.default)(app_1.default).put("/updateUser").send(updatedData);
        // console.log(updatedData);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedData);
    }));
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
