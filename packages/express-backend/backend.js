import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userServices from "./services/user-services.js";

const app = express();
const port = 8000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/csc307", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.use(cors());
app.use(express.json());

// GET all users or filter by name, job, or both
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name && job) {
    // Handle filtering by both name and job (assignment task)
    userServices.findUserByNameAndJob(name, job)
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("An error occurred in the server.");
      });
  } else if (name) {
    // Handle filtering by name
    userServices.findUserByName(name)
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("An error occurred in the server.");
      });
  } else if (job) {
    // Handle filtering by job
    userServices.findUserByJob(job)
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("An error occurred in the server.");
      });
  } else {
    // Handle getting all users
    userServices.getUsers()
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("An error occurred in the server.");
      });
  }
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userServices.findUserById(id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred in the server.");
    });
});

// POST new user
app.post("/users", (req, res) => {
  const user = req.body;
  userServices.addUser(user)
    .then((savedUser) => {
      res.status(201).send(savedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred in the server.");
    });
});

// DELETE user by ID (assignment task)
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userServices.deleteUserById(id)
    .then((deletedUser) => {
      if (deletedUser) {
        res.status(200).send(deletedUser);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred in the server.");
    });
});

// Start the server
app.listen(port, () => {
  console.log(`REST API is listening at http://localhost:${port}`);
});
