const mongoose = require("mongoose");
require('dotenv').config();


const connectionMongo = () => {
    mongoose.set("strictQuery", true);
    // mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@mongodb:27017/`);
    mongoose.connect('mongodb+srv://victormdsp:81005496@cluster0.zm0nvyf.mongodb.net/produtos')
}

export default connectionMongo;