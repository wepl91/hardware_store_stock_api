// ===============
// PORT
// ===============
process.env.PORT = process.env.PORT || 3000;
// ===============
// ENV
// ===============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// ===============
// DATABASE CONECTION
// ===============
let urlDB = "";
if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb://localhost:27017/hardware_store";
} else {
    urlDB = "here write the mongo connection with mongo atlas and other type of connection mode"
};
process.env.URLDB = urlDB;
// ===============
// TOKEN TTL
// ===============
process.env.TOKEN_TTL = '48h';
// ===============
// AUTH SEED
// ===============
process.env.AUTH_SEED = process.env.AUTH_SEED ||  'this-is-the-auth-seed';