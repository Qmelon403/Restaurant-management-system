const express = require("express");
const cors = require("cors");

const login = require("./login");
const insert = require("./insert");
const select = require("./select");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.post("/api/login", login);
app.post("/api/insert", insert.insertingredients);
app.post("/api/insertproducts", insert.insertproducts);

app.get("/api/select", select.selectingredients);
app.get("/api/selectproducts", select.selectproducts);






app.listen(5000, () => {
    console.log("server running")
});