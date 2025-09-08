const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function(req, res, next) {
    console.log("🔹 Middleware Triggered! 🔹");
    console.log("🔹 Request Method:", req.method);
    console.log("🔹 Request Path:", req.path);
    console.log("🔹 Full Request Headers:", req.headers);
    console.log("🔹 Request Body:", req.body);
    var token = null
    if (req.method === 'PUT') {
        token = req.body["headers"]["auth-token"]

    }else if (req.method === 'POST') {
        console.log("updatedData1",req);
        token = req.body["headers"]["auth-token"]

    }else if (req.method === 'GET') {
        console.log("updatedData2",req.headers['auth-token']);
        token = req.headers['auth-token']

    }
// token = req.body["headers"]["auth-token"]? req.body["headers"]["auth-token"] : req.header["auth-token"] ;
console.log("updatedData3",token);
    if (!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, `${process.env.JWT_SECRET}`);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};