# @dekproject/redis

Redis interface plugin for DEK

## Instalation

To install the bootstrap we recommend using the CLI

```bash
$ npm i -g @dekproject/cli
$ dek install redis
```

or

```bash
$ npm i @dekproject/redis @dekproject/scope
$ nano .env
```

In the .env file add the following settings

```
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_FAMILY=4 // 4 (IPv4) or 6 (IPv6)
REDIS_PASSWORD=
REDIS_DB=0
```

## Usage

Using direct

```bash
$ npm i @dekproject/scope
```

```js
import dotenv from "dotenv";
import { $, plugins } from "@dekproject/scope";

(async () => {
    dotenv.config({ path: "./sample/.env" });
    await plugins("./");

    $.redis.multi().set("foo", "bar").get("foo").exec(function (err, results) {
        if(err) console.log(err);
        else console.log(results);
    });
})();
```

Using in the standard DEK skeleton

```js
import { app, redis } from "@dekproject/scope";

redis.multi().set('foo', 'bar').get('foo').exec(function (err, results) {
    if(err) console.log(err);
    else console.log(results);
});
```
