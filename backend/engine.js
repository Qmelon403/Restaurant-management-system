const db = require("./db");

function calculateproduct(ingredients, selling_price, dtaingred) {

    const product_cost = dataingred(ingredients, dtaingred);

    const profit = selling_price - product_cost;
    const profit_unit = (profit / selling_price) * 100;

    return { product_cost, profit_unit };




};
