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
exports.getMatchedUsers = exports.updateUser = exports.getAllUsers = exports.updateMatch = exports.getUser = exports.loginUser = exports.postUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../model/users");
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, ownerName, dogName, ownerAge, dogAge, gender, avatar, matches, about, } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const existingUser = yield users_1.User.findOne({ email });
        if (existingUser) {
            return res.status(409).send("User already exists. Please login");
        }
        const sanitizedEmail = email.toLowerCase();
        const data = {
            email: sanitizedEmail,
            password: hashedPassword,
            ownerName: ownerName,
            dogName: dogName,
            ownerAge: ownerAge,
            dogAge: dogAge,
            gender: gender,
            avatar: avatar,
            matches: matches,
            about: about,
        };
        const newUser = yield users_1.User.create(data);
        const token = jsonwebtoken_1.default.sign(data, sanitizedEmail, {
            expiresIn: 60 * 24,
        });
        res.status(201).json({ message: "ok", data: data.email, token: token });
    }
    catch (err) {
        console.log(err);
    }
});
exports.postUser = postUser;
// login existing user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield users_1.User.findOne({ email });
        if (user && user.password) {
            const correctPassword = yield bcrypt_1.default.compare(password, user.password);
            if (correctPassword) {
                const payload = {
                    userId: user._id,
                    email: user.email,
                    // ownerName: user.ownerName,
                    // dogName: user.dogName,
                    // ownerAge: user.ownerAge,
                    // dogAge: user.dogAge,
                    // gender: user.gender,
                    // avatar: user.avatar,
                    // matches: user.matches,
                };
                const token = jsonwebtoken_1.default.sign(payload, email, {
                    expiresIn: 60 * 24,
                });
                res.status(201).json({ token: token, userId: user._id });
            }
        }
        else {
            res.status(400).send("Invalid Credentials");
        }
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});
exports.loginUser = loginUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.userId;
    try {
        const query = { user_id: userId };
        const user = yield users_1.User.findOne(query);
        if (user) {
            const safeUser = {
                _id: user._id,
                ownerName: user.ownerName,
                dogName: user.dogName,
                dogAge: user.dogAge,
                ownerAge: user.ownerAge,
                gender: user.gender,
                avatar: user.avatar,
                matches: user.matches,
                about: user.about,
            };
            res.status(200).send(safeUser);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});
exports.getUser = getUser;
// //update user matched
const updateMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, matchedUserId } = req.body;
    try {
        const query = { user_id: userId };
        const updateDocument = {
            $push: { matches: { user_id: matchedUserId } },
        };
        const user = yield users_1.User.updateOne(query, updateDocument);
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});
exports.updateMatch = updateMatch;
// get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnedUsers = yield users_1.User.find({});
        res.status(200).send(returnedUsers);
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});
exports.getAllUsers = getAllUsers;
// // Update account /onboarding
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    // console.log(req.body);
    try {
        const query = { _id: user._id };
        const updateDocument = {
            $set: {
                ownerName: user.ownerName,
                ownerAge: user.ownerAge,
                gender: user.gender,
                avatar: user.avatar,
                dogName: user.dogName,
                about: user.about,
                matches: user.matches,
            },
        };
        const insertedUser = yield users_1.User.findOneAndUpdate(query, updateDocument);
        console.log(insertedUser);
        res.status(200).send(insertedUser);
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});
exports.updateUser = updateUser;
const getMatchedUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIds = req.query.userIds;
        if (typeof userIds === "string") {
            const parsedUserIds = JSON.parse(userIds);
            const pipeline = [
                {
                    $match: {
                        user_id: {
                            $in: parsedUserIds,
                        },
                    },
                },
            ];
            const foundUsers = yield users_1.User.aggregate(pipeline);
            res.status(200).json(foundUsers);
        }
        else {
            throw new Error("userIds must be a string.");
        }
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
});
exports.getMatchedUsers = getMatchedUsers;
