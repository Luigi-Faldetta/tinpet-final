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
const msg_1 = require("./model/msg");
const databaseTest = "Newtest";
const mongoURI = `mongodb://localhost:27017/${databaseTest}`;
describe("Users tests", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connection.close();
            yield mongoose_1.default.connect(mongoURI);
        }
        catch (error) {
            console.log(error, "before Error");
        }
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield users_1.User.deleteMany();
        yield mongoose_1.default.connection.close();
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
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedData);
    }));
    it("should get a user by userId", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield users_1.User.create({
            email: "test@test.com",
            password: "password123",
        });
        const response = yield (0, supertest_1.default)(app_1.default).get(`/user/${user._id}`);
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
    }));
    it("should update a user's match", () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = yield users_1.User.create({
            email: "user1@test.com",
            password: "password123",
        });
        const user2 = yield users_1.User.create({
            email: "user2@test.com",
            password: "password123",
        });
        user1.matches.push(user2._id);
        yield user1.save();
        const response = yield (0, supertest_1.default)(app_1.default)
            .put("/addmatch")
            .send({ userId: user1._id, matchedUserId: user2._id });
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        const updatedUser1 = yield users_1.User.findById(user1._id);
        expect(updatedUser1 === null || updatedUser1 === void 0 ? void 0 : updatedUser1.matches).toContainEqual(user2._id);
    }));
    it("should return matched users", () => __awaiter(void 0, void 0, void 0, function* () {
        const user1 = yield users_1.User.create({
            email: "user1@test.com",
            password: "password123",
        });
        const user2 = yield users_1.User.create({
            email: "user2@test.com",
            password: "password123",
        });
        user1.matches.push(user2._id);
        yield user1.save();
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/matchedusers")
            .query({ userIds: JSON.stringify([user1._id.toString()]) });
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]._id).toBe(user1._id.toString());
    }));
});
describe("Messages test", () => {
    let user1;
    let user2;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connection.close();
            yield mongoose_1.default.connect(mongoURI);
            user1 = yield users_1.User.create({
                email: "user1@test.com",
                password: "password123",
            });
            user2 = yield users_1.User.create({
                email: "user2@test.com",
                password: "password123",
            });
        }
        catch (error) {
            console.log(error);
        }
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield users_1.User.deleteMany();
        yield msg_1.MessagesTin.deleteMany();
        yield mongoose_1.default.connection.close();
    }));
    it("should add a new message", () => __awaiter(void 0, void 0, void 0, function* () {
        const newMessage = {
            fromUser: user1._id,
            toUser: user2._id,
            message: "New message",
        };
        const response = yield (0, supertest_1.default)(app_1.default).post("/message").send(newMessage);
        expect(response.status).toBe(201);
        console.log(response.body.data);
        expect(response.body.data.message).toBe(newMessage.message);
        const insertedMessage = yield msg_1.MessagesTin.findOne(newMessage);
        expect(insertedMessage).toBeDefined();
    }));
    it("should get messages between two users", () => __awaiter(void 0, void 0, void 0, function* () {
        yield msg_1.MessagesTin.create({
            fromUser: user1._id,
            toUser: user2._id,
            message: "Hello User2",
        });
        yield msg_1.MessagesTin.create({
            fromUser: user2._id,
            toUser: user1._id,
            message: "Hi User1",
        });
        const response = yield (0, supertest_1.default)(app_1.default).get("/messages").send({
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
    }));
});
