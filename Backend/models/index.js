const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.customer = require("./customerModel");

//TODO Swap these out
db.ROLES = ["designer", "technical", "admin"];



module.exports = db;