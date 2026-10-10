// used for reading .env file
require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database.js")
connectToDB()
app.listen(3000, () => {
  console.log("server started at port 3000")

})

// used for starting server