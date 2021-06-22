require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require('./middleware/error')

//conect db
connectDB()

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));


// errorHandler should be last piece of middleware 
app.use(errorHandler)


const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// handle errors when server crashes 
process.on('unhandledRejection', (err, promise)=>{
console.log(`Logged error: ${err}`)
server.close(()=> process.exit(1))
})