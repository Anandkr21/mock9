const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authetication(req, res, next) {
    let token = req.headers.authetication?.split(' ')[1];
    if (!token) {
        res.status(401).send({
            msg: "token not available"
        })
        return;
    }
    try {
        let decoded = jwt.verify(token.process.env.secret_key);
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).send({
            msg: "Invalid token"
        })
    }
}

module.exports = authetication;