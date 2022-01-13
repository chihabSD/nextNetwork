const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL || "mongodb://localhost:27017/nextNetwork",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDb;
