import { v4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/users";
import { Response, Request } from "express";

export const postUser = async (req: Request, res: Response) => {
  console.log(req.body)
  const { email, password, ownerName, dogName, ownerAge, dogAge } = req.body;

  // const generateUserId = v4();
  // const hashedPassword = await bcrypt.hash(password, 10);

  try {
  //   const existingUser = await User.findOne({ email });

  //   if (existingUser) {
  //     return res.status(409).send("User already exists. Please login");
  //   }

    const sanitizedEmail = email.toLowerCase();

    const data = {
      // email: sanitizedEmail,
      // password: hashedPassword,
      email: sanitizedEmail,
      password: password,
      ownerName: ownerName,
      dogName: dogName,
      ownerAge: ownerAge,
      dogAge: dogAge,
    };

    const newUser = await User.create(data);

    // const token = jwt.sign(newUser, sanitizedEmail, {
    //   expiresIn: 60 * 24,
    // });

    // res.status(201).json({ token, userId: generateUserId });
    res.status(201).json({message: "ok", data: data.email});
  } catch (error) {
    console.log(error);
  }
};

// login existing user

// app.post("/login", async (req, res) => {
//   const client = new MongoClient(URI);
//   const { email, password } = req.body;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const user = await users.findOne({ email });

//     const correctPassword = await bcrypt.compare(
//       password,
//       user.hashed_password
//     );

//     if (user && correctPassword) {
//       const token = jwt.sign(user, email, {
//         expiresIn: 60 * 24,
//       });

//       res.status(201).json({ token, userId: user.user_id });
//     } else {
//       res.status(400).send("Invalid Credentials");
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     await client.close();
//   }
// });

// app.get("/user", async (req, res) => {
//   const client = new MongoClient(URI);
//   const userId = req.query.userId;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: userId };
//     const user = await users.findOne(query);
//     res.status(200).send(user);
//   } finally {
//     await client.close();
//   }
// });

// //update user matched
// app.put("/addmatch", async (req, res) => {
//   const client = new MongoClient(URI);
//   const { userId, matchedUserId } = req.body;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: userId };
//     const updateDocument = {
//       $push: { matches: { user_id: matchedUserId } },
//     };

//     const user = await users.updateOne(query, updateDocument);
//     res.send(user);
//   } finally {
//     await client.close();
//   }
// });

// get all users

// app.get("/users", async (req, res) => {
//   const client = new MongoClient(URI);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const returnedUsers = await users.find().toArray();
//     res.status(200).send(returnedUsers);
//   } catch (error) {
//     console.log(`Error: ${error}`);
//   } finally {
//     await client.close();
//   }
// });

// // Update account /onboarding
// app.put("/user", async (req, res) => {
//   const client = new MongoClient(URI);
//   const formData = req.body.formData;

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const query = { user_id: formData.user_id };
//     const updateDocument = {
//       $set: {
//         name: formData.name,
//         age: formData.age,
//         gender: formData.gender,
//         url: formData.url,
//         about: formData.about,
//         matches: formData.matches,
//       },
//     };
//     const insertedUser = await users.updateOne(query, updateDocument);
//     res.send(insertedUser);
//   } finally {
//     await client.close();
//   }
// });

// app.get("/matchedusers", async (req, res) => {
//   const client = new MongoClient(URI);
//   const userIds = JSON.parse(req.query.userIds);

//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const users = database.collection("users");

//     const pipeline = [
//       {
//         $match: {
//           user_id: {
//             $in: userIds,
//           },
//         },
//       },
//     ];
//     const foundUsers = await users.aggregate(pipeline).toArray();
//     res.json(foundUsers);
//   } finally {
//     await client.close();
//   }
// });
