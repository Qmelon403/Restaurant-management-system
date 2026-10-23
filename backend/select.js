const db = require("./db");

async function selectingredients(res) {
    try {
        const sql = "SELECT * FROM ingredients"

        const [row] = await db.execute(sql);

        res.json(row);
    }
    catch (error) {
        res.status(500).json({ error: "Query failed" });
    }
};
module.exports = { selectingredients };