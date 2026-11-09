const db = require("./db");

function calculateproduct(ingredients, selling_price, dtaingred) {

    const product_cost = dataingred(ingredients, dtaingred);

    const profit = selling_price - product_cost;
    const profit_unit = (profit / selling_price) * 100;

    return { product_cost, profit };




};

function dataingred(ingredients, dtaingred) {

    const results = ingredients.map((ingred) => {

        const dtaresults = dtaingred.find(
            (dta) => Number(dta.ingredient_id) === Number(ingred.ingredient_id)
        );
        const unit_cost = dtaresults ? dtaresults.cost / 1000 : 0;

        return {
            ingredient_id: ingred.ingredient_id,
            name: ingred.name,
            unit_cost: unit_cost,
            quantity: ingred.quantity,
            totalcost: (unit_cost * ingred.quantity)
        };
    });

    const total = results.reduce(
        (sum, ingr) => sum + ingr.totalcost,
        0
    );

    return total;
}
module.exports = { calculateproduct };