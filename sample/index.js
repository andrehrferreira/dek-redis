import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { $, plugins } from "@dekproject/scope";

(async () => {
    dotenv.config({ path: "./sample/.env" });
    await plugins("./src");

    var app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.get("/get", (req, res) => {

    });

    app.post("/set", (req, res) => {

    });

    const PORT = process.env.PORT || 5555;

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
})();
