const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("./models/user.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware/authMiddleware.js");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))),
  app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/task-manager-users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

//// uses async/await to ensure that the details are being processed before continuing onto the next portion of the code
app.post("/login", async (req, res) => {
  // get the details from email and password input -> collected from req.body
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Email and password are required to login!");
  }

  try {
    // checks for email exists in database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found!");
    }

    // checks if password matches the email
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials!");
    }

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, user.jwtSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful!",
      data: token,
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).send("Server error!");
  }
});

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).send('Please complete the form with all the details!');
  };

});

app.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Access granted to protected route",
    user: req.user,
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is now listening on port ${PORT}!`);
  console.log(
    `Can access the application by clicking on: http://localhost:${PORT}`
  );
});
