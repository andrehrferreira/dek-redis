# @dekproject/redis

Redis interface plugin for DEK

What does this plugin do?

* Control configuration for connection to RabbitMQ in production development mode in a simplified way with **dotenv**
* Performs connection implementation along the lines ES6 being pre requirement to start the project
* Compressed storage functions using Snappy
* Load balance for queries on multiple connections

## Instalation

To install the bootstrap we recommend using the CLI

```bash
$ yarn add @dekproject/redis --save
```

In the .env file add the following settings

```
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_FAMILY=4 // 4 (IPv4) or 6 (IPv6)
REDIS_PASSWORD=
REDIS_DB=0
```

or 

```
REDIS_URI=localhost:6379
```

## Load Balance

To configure loadbalance just configure a list of settings separated by commas

```
REDIS_SLAVES=localhost:6379,localhost:6380,localhost:6381
```

```js
import { app, redis, redislb } from "@dekproject/scope";

$.wait(["redislb"]).then(async () => {
    console.time("Loading Load Balance");

    //Load Balance 
    await redislb.getSlave().set("foo3", "bar3");
    let result = await redislb.getSlave().get("foo3");
    console.log(result);

    console.timeLog("Loading Load Balance");
});
```

## Usage

Using in the standard DEK skeleton

```js
import { app, redis, redislb } from "@dekproject/scope";
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
    await $.redis.set("foo4", "bar4");
    let result5 = await $.redislb.getSlave().get("foo4");
    console.log({ result5 });

    console.timeLog("Writing on the master and reading the slaves");

    console.time("Writing on the master and reading the slaves Compress");
    //Writing on the master and reading the slaves mode Compress
    await $.redis.setCompress("foo6", [{ bar: "bar6" }]);
    let result6 = await $.redislb.getSlave().getCompress("foo6");
    console.log({ result6 });
    console.timeLog("Writing on the master and reading the slaves Compress");
});
```
