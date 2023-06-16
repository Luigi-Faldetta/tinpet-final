"use strict";
// app.get("/messages", async (req, res) => {
//   const { userId, correspondingUserId } = req.query;
//   const client = new MongoClient(URI);
//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const messages = database.collection("messages");
//     const query = {
//       from_userId: userId,
//       to_userId: correspondingUserId,
//     };
//     const foundMessages = await messages.find(query).toArray();
//     res.send(foundMessages);
//   } finally {
//     await client.close();
//   }
// });
// // Add a Message to our Database
// app.post("/message", async (req, res) => {
//   const client = new MongoClient(URI);
//   const message = req.body.message;
//   try {
//     await client.connect();
//     const database = client.db("app-data");
//     const messages = database.collection("messages");
//     const insertedMessage = await messages.insertOne(message);
//     res.send(insertedMessage);
//   } finally {
//     await client.close();
//   }
// });
