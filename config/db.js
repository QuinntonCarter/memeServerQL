const mongoose = require("mongoose");
const MONGO_URI_VAR = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI_VAR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB Connected ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.error("error connecting to mongodb", error);
    process.exit(1);
  }
};

module.exports = connectDB;
