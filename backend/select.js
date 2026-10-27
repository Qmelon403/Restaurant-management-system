const db = require("./db");

function selectingredients(req, res) {
    const sql = "SELECT * FROM infredients";

    db.execute(sql, (err, rows) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({
                error: "Query failed"
            });
        }

        return res.status(200).json(rows);
    });
}


function selectproducts(req, res) {
    const sql = "SELECT * FROM products"

    db.execute(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "database error"
            });
        }
        const products = results[0];

        return res.status(200).json({
            products: products
        })
    });

};
module.exports = { selectingredients, selectproducts };

