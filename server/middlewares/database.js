const mongoose = require("mongoose");

const DB_HOST = "localhost";
const DB_PORT = "27017";
const DB_NAME = "dev-kanban";
const DB_USER_NAME = "";
const DB_PASSWORD = "";
const db_password = ""
//"mongodb://" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME;
const MONGODB_URI = process.env.MONGODB_URI
const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);

    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (e) {
    //If failed to connect
    console.log(`MongoDB failed to connect. ${e.message}`);
  }
};

module.exports = connectToDatabase;
