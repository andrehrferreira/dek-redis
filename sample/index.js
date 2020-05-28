import dotenv from "dotenv";
import { $, plugins } from "@dekproject/scope";

(async () => {
    dotenv.config();
    await plugins("./");

    $.wait(["redis", "redislb"]).then(async () => {
        console.time("Loading");

        //Get/Set
        await $.redis.set("foo", "bar");
        let result = await $.redis.get("foo");
        console.log(result);

        console.timeLog("Loading");
        console.time("Loading Compress");

        //Compress
        await $.redis.setCompress("foo2", "bar2");
        let result2 = await $.redis.getCompress("foo2");
        console.log(result2);

        console.timeLog("Loading Compress");
        console.time("Loading Load Balance");

        //Load Balance 
        await $.redislb.getSlave().set("foo3", "bar3");
        let result3 = await $.redislb.getSlave().get("foo3");
        console.log(result3);

        console.timeLog("Loading Load Balance");
    });
})();
