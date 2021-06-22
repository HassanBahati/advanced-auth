const express = require("express");
require("dotenv").config({ path: "./config.env" });

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
