const db = require("./db");

function calculateproduct(ingredients, selling_price, dtaingred) {

    const product_cost = dataingred(ingredients, dtaingred);

    const profit = selling_price - product_cost;
    const profit_unit = (profit / selling_price) * 100;

    return { product_cost, profit_unit };




};

function dataingred(ingredients, dtaingred) {

    const results = ingredients.map((ingred) => {

        const dtaresults = dtaingred.find(
            (dta) => dta.ingredient_id === ingred.ingredient_id
        );

        return {
            ingredient_id: ingred.ingredient_id,
            name: ingred.name,
            unit_cost: dtaresults.cost / 1000,
            quantity: ingred.quantity,
            totalcost: (dtaresults.cost * ingred.quantity) / 1000
        };
    });

    const total = results.reduce(
        (sum, ingr) => sum + ingr.totalcost,
        0
    );

    return total;
}