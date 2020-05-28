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
        console.log({ result });

        console.timeLog("Loading");
        console.time("Loading Compress");

        //Compress String
        await $.redis.setCompress("foo2", "bar2");
        let result2 = await $.redis.getCompress("foo2", { json: false });
        console.log({ result2 });

        //Compress Object
        await $.redis.setCompress("foo3", { bar: "bar3" });
        let result3 = await $.redis.getCompress("foo3");
        console.log({ result3 });

        console.timeLog("Loading Compress");
        console.time("Loading Load Balance");

        //Load Balance 
        await $.redislb.getSlave().set("foo4", "bar4");
        let result4 = await $.redislb.getSlave().get("foo4");
        console.log({ result4 });

        console.timeLog("Loading Load Balance");

        console.time("Writing on the master and reading the slaves");
        //Writing on the master and reading the slaves
        await $.redis.set("foo5", "bar4");
        let result5 = await $.redislb.getSlave().get("foo5");
        console.log({ result5 });

        console.timeLog("Writing on the master and reading the slaves");

        console.time("Writing on the master and reading the slaves Compress");
        //Writing on the master and reading the slaves mode Compress
        await $.redis.setCompress("foo6", [{ bar: "bar6" }]);
        let result6 = await $.redislb.getSlave().getCompress("foo6");
        console.log({ result6 });
        console.timeLog("Writing on the master and reading the slaves Compress");

        console.time("Writing on the master and reading the slaves Compress with expiryMode");
        //Writing on the master and reading the slaves mode Compress
        await $.redis.setCompress("foo7", [{ bar: "bar7" }], "EX", 10);
        let result7 = await $.redislb.getSlave().getCompress("foo7");
        console.log({ result7 });
        console.timeLog("Writing on the master and reading the slaves Compress");
        
        
        console.time("getCompress null");
        let result8 = await $.redis.getCompress("foo8");
        console.log({ result8 });
        console.timeLog("getCompress null");
    });
})();
