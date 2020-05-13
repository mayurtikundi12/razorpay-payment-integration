let mongoose = require('mongoose');
let CONFIG = require('../config/config');
// *** import all schemas here 
require('./business_category.model');
require('./business.model');
require('./user.model');
require('./coupon.model');
require('./donation.model');
require('./business_enquiry.model');
require('./business_group.model');
require('./user_purchase.model');
// **********************
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    // autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    // poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    // bufferMaxEntries: 0,
    // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    // family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(CONFIG.dbURL,options);

let connection = mongoose.connection
connection.on('connected', function () {
    console.log("mongoose connection to mongodb successfully conencted")
});
connection.on('error', function (error) {
    console.log("mongoose connection failed !!!!!", error)
});
connection.on('disconnected', function () {
    console.log("mongoose connection to mongodb disconencted");

});