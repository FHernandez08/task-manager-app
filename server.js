const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))),
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/login", (req, res) => {

});

app.post("/register", (req, res) => {

});

app.listen(PORT, (req, res) => {
    console.log(`Server is now listening on port ${PORT}!`);
    console.log(`Can access the application by clicking on: http://localhost:${PORT}`);
});