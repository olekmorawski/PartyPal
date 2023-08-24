const port = 8000;
const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const uri =
  "mongodb+srv://olekmorawski:admin@cluster.8lth5i1.mongodb.net/?retryWrites=true&w=majority";
const app = express();

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).send("user already exists");
    }

    const sanitizedEmail = email.toLowerCase();
    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };

    const insertedUser = await users.insertOne(data);
    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });
    res.status(201).json({ token, userId: generatedUserId });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  } finally {
    await client.close();
  }
});

app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(400).json("Invalid Credentials");
    }

    const correctPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (!correctPassword) {
      return res.status(400).json("Invalid Credentials");
    }

    const token = jwt.sign(user, email, {
      expiresIn: 60 * 24,
    });

    return res.status(201).json({ token, userId: user.user_id });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Server Error");
  } finally {
    await client.close();
  }
});

app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.send(user);
  } finally {
    await client.close();
  }
});

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  const userIds = JSON.parse(req.query.userIds);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];
    const foundUsers = await users.aggregate(pipeline).toArray();
    res.send(foundUsers);
  } finally {
    await client.close();
  }
});

app.get("/interestingusers", async (req, res) => {
  const client = new MongoClient(uri);
  const sex = req.query.sex;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const query = { sex: { $eq: sex } };
    const foundUsers = await users.find(query).toArray();

    res.json(foundUsers);
  } finally {
    await client.close();
  }
});

app.put("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: formData.user_id };
    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_sex: formData.show_sex,
        sex: formData.sex,
        sex_interest: formData.sex_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
      },
    };
    const insertedUser = await users.updateOne(query, updateDocument);
    res.json(insertedUser);
  } finally {
    await client.close();
  }
});

app.put("/addmatch", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchedUserId } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };
    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
});

app.get("/messages", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, correspondingUserId } = req.query;
  try {
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const query = {
      from_userId: userId,
      to_userId: correspondingUserId,
    };
    const foundMessages = await messages.find(query).toArray();
    res.send(foundMessages);
  } finally {
    await client.close();
  }
});

app.post("/message", async (req, res) => {
  const client = new MongoClient(uri);
  const message = req.body.message;
  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");
    const insertedMessage = await messages.insertOne(message);
    res.send(insertedMessage);
  } finally {
    await client.close();
  }
});

app.post("/create-event", async (req, res) => {
  const client = new MongoClient(uri);
  const eventFormData = req.body.eventFormData;
  try {
    await client.connect();
    const database = client.db("app-data");
    const events = database.collection("events");

    const newEvent = {
      title: eventFormData.title,
      address: eventFormData.address,
      hour: eventFormData.hour,
      minutes: eventFormData.minutes,
      timeOfDay: eventFormData.timeOfDay,
      about: eventFormData.about,
      isPayable: eventFormData.isPayable,
      price: eventFormData.price,
      url: eventFormData.url,
      attendees: eventFormData.attendees,
    };

    const insertedEvent = await events.insertOne(newEvent);
    res.send(insertedEvent);
  } finally {
    client.close();
  }
});

app.get("/geteventcard", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const eventCollection = database.collection("events");

    const { title, url } = req.query;
    const queryParams = {};
    if (title) {
      queryParams.title = title;
    }
    if (url) {
      queryParams.url = url;
    }

    const foundEvents = await eventCollection.find(queryParams).toArray();
    res.send(foundEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("An error occurred while fetching events.");
  } finally {
    await client.close();
  }
});

app.get("/geteventdata/", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const eventCollection = database.collection("events");

    const { title, url, address, hour, timeOfDay, about, isPayable, price } =
      req.query;

    const queryParams = {};
    if (title) queryParams.title = title;
    if (url) queryParams.url = url;
    if (address) queryParams.address = address;
    if (hour) queryParams.hour = hour;
    if (timeOfDay) queryParams.timeOfDay = timeOfDay;
    if (about) queryParams.about = about;
    if (isPayable) queryParams.isPayable = isPayable === "false";
    if (price) queryParams.price = parseFloat(price);

    const eventData = await eventCollection.find(queryParams).toArray();
    res.send(eventData);
    console.log(eventData);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("An error occurred while fetching events.");
  } finally {
    await client.close();
  }
});

app.get("/geteventdata/:id", async (req, res) => {
  const client = new MongoClient(uri);
  const { id } = req.params;

  try {
    await client.connect();
    const database = client.db("app-data");
    const eventCollection = database.collection("events");

    const eventData = await eventCollection.findOne({ _id: new ObjectId(id) });
    res.send(eventData);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("An error occurred while fetching events.");
  } finally {
    await client.close();
  }
});

app.listen(port, () => console.log("server on port " + port));
