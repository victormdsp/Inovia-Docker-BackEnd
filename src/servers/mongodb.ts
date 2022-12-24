const mongoose = require("mongoose");
require('dotenv').config();


const connectionMongo = () => {
    mongoose.set("strictQuery", true);
    // mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@mongodb:27017/`);
    mongoose.connect(`mongodb://mongodb:27017/produtos`)
}

export default connectionMongo;