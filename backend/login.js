const db = require("./db");

function login(req, res) {
    const { email, password, status } = req.body;

    const sql = `SELECT user_id, email, password, status FROM users WHERE email = ? AND status = ?`;

    db.query(sql, [email, status], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "database error"
            });
        }
        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "invalid passwword or email"
            });
        }
        const user = results[0];

        console.log(user);
        res.json({
            success: true,
            message: "success"

        });
    });


}
module.exports = login;