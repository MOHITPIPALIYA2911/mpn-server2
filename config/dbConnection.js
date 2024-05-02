const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("DB connected, HOST:", connect.connection.host, " NAME:", connect.connection.name);
  } catch (error) {
    console.log("error:", error);
    console.log("CONNECTION_STRING:", process.env.CONNECTION_STRING);
    process.exit(1);
  }
};

module.exports = connectDb;
