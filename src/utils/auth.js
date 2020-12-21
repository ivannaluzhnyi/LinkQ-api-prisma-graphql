const jwt = require("jsonwebtoken");

const { APP_SECRET } = require("./config");

const createToken = async (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            APP_SECRET,
            {
                algorithm: "HS256",
                expiresIn: 3600,
            },
            (err, token) => {
                if (err) reject();
                else resolve(token);
            }
        );
    });
};

const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, APP_SECRET, (err, decodedToken) => {
            if (err) {
                reject(err);
            } else {
                resolve(decodedToken);
            }
        });
    });
};

module.exports = {
    createToken,
    verifyToken,
};
