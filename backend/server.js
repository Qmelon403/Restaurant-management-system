const express = require("express");
const cors = require("cors");

const login = require("./login");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/login", login);

app.listen(5000, () => {
    console.log("server running")
});