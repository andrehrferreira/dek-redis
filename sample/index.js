import dotenv from "dotenv";
import { $, plugins } from "@dekproject/scope";

(async () => {
    dotenv.config({ path: "./sample/.env" });
    await plugins("./");

    $.wait("redis").then(() => {
        $.redis.multi().set("foo", "bar").get("foo").exec(function (err, results) {
            if(err) console.log(err);
            else console.log(results);
        });
    });
})();
