require("dotenv").config();

const URL_DB_PRISMA = process.env.URL_DB_PRISMA;
const APP_SECRET = process.env.APP_SECRET || "TEST-SECRET";

module.exports = {
    URL_DB_PRISMA,
    APP_SECRET,
};
