const db = require("./db");
const engine = require("./engine");

function insertproducts(req, res) {

    const { name, selling_price, ingredients } = req.body;

    const productIds = ingredients.map(
        ingred => ingred.ingredient_id
    );

    const placeholders = productIds.map(() => "?").join(",");

    const sql2 = `
        SELECT *
        FROM ingredients
        WHERE ingredient_id IN (${placeholders})
    `;

    db.query(sql2, productIds, (err, dtaingred) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }


        const { product_cost, profit_unit } =
            engine.calculateproduct(
                ingredients,
                selling_price,
                dtaingred
            );

        const sql = `
            INSERT INTO products
            (name, selling_price, product_cost, profit_unit)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [name, selling_price, product_cost, profit_unit],
            (err, result) => {

                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: err.message
                    });
                }

                const product_id = result.insertId;


                insertrecipe(product_id, ingredients);

                res.json({
                    success: true,
                    message: "database updated"
                });
            }
        );
    });
}
function insertingredients(req, res) {
    const { name, cost, unit } = req.body;

    const sql = `INSERT INTO ingredients (name, cost, unit) VALUES (?, ?, ?)`;

    db.query(sql, [name, cost, unit], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(
            {
                success: true,
                message: "successfully added ingredients"
            }
        )
    })
}
function insertrecipe(product_id, ingredients) {

    const recipe = ingredients.map((ingred) => {
        return [
            product_id,
            ingred.ingredient_id,
            ingred.unit
        ]
    });
    const sql = `INSERT INTO recipe (product_id, ingredient_id, quantity) VALUES ?`;

    db.query(sql, [recipe], (err) => {
        if (err) {
            console.log(err);
        }
        console.log("all recipes inserted");
    });

}
module.exports = { insertproducts, insertingredients };