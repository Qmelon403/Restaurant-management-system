const express = require("express");
const cors = require("cors");

const login = require("./login");
const insert = require("./insert");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/login", login);
app.post("/api/insert", insert.insertingredients);
app.post("/api/insertproducts", insert.insertproducts);

app.listen(5000, () => {
    console.log("server running")
});