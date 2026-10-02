"use strict";

require("dotenv").config();
const express = require("express");
const articleRoutes = require("./routes/article.routes");
const cors = require("cors");
const morgan = require("morgan");
const pool = require("./config/database");
const PORT = process.env.PORT || 3001;
const app = express();
const morganMode =
  process.env.MORGAN_MODE ||
  (process.env.NODE_ENV === "production" ? "combined" : "dev");

app.use(morgan(morganMode));
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message:"Mini Blog API is running"
    });
    
});

app.use("/api/articles", articleRoutes);

pool.query("SELECT NOW()")
    .then((result) => {
        console.log("PostgreSQL connected:", result.rows[0]);
    })
    .catch((error) => {
        console.error("PostgreSQL connection error:", error);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
