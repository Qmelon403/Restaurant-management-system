

function calculateproduct(ingredients, selling_price) {

    const product_cost = ingredients.reduce((total, ingred) => {
        return total + (ingred.price * ingred.unit);
    }, 0);

    const profit = selling_price - product_cost;
    const profit_unit = (profit / selling_price) * 100;

    return { product_cost, profit_unit };




};