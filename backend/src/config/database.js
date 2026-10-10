const mongoose = require("mongoose")
require("dotenv").config({ path: ".env" });
async function connectToDB() {
  try {

    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to DB")
  }
  catch (err) {
    console.log(err);
  }
}
module.exports = connectToDB
