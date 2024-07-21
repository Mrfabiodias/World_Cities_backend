//bring in packages:

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // to access .env variables

// initiate server application
const app = express();

// middleware to parse incoming JSON data into request body
app.use(express.json());

// cors middleware
app.use(cors());

//connect to mongoDB
const MongoURI = process.env.MONGO_URI;

mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("DB connection OK");
  })
  .catch((err) => console.log("DB connection error:", err));

//schema and model
const CityDbSchema = new mongoose.Schema({
  city: {
    type: String,
  },
});

const CityDb = mongoose.model("City", CityDbSchema);

// api routes
app.get("/", (req, res) => res.send("hello world"));

app.get("/json", (req, res) => {
  res.json({ msg: "this is some json" });
});

//create a city entry into the database:

app.post("/city", async (req, res) => {
  try {
    const newCity = new CityDb({
      city: req.body["city"],
    });
    const cit = await CityDb.create(newCity);
    res.status(200).json(cit);
  } catch (error) {
    res.status(500).json({ error: "Error creating cit record" });
  }
});

//read all the cities from the database
app.get("/city", async (req, res) => {
  try {
    const allCities = await CityDb.find();
    res.status(200).json(allCities);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cities" });
  }
});

//delete all cities from the database:
app.delete("/city", async (req, res) => {
  try {
    const allCities = await CityDb.deleteMany();
    res.status(200).json(allCities);
  } catch (error) {
    res.status(500).json({ error: "Error deleting cities" });
  }
});

// start up server
app.listen(8000, () => {
  console.log("server is up and listening on port 8000");
});

//
