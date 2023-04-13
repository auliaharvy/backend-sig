const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// accessible to an
app.use(cors({
    credentials: true,
    origin: process.env.HOST_API_GATEWAY
}));

// Body Parser middleware to handle raw JSON files
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});

// routes
app.use("/api/drivers", require("./routes/drivers/app"));

// when invalid routes are entered
app.use(async (req, res) => {
    res.status(404).send(`Route is no where to be found.`);
});



module.exports = app;