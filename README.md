# @dekproject/redis

Redis interface plugin for DEK

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

## Usage

Using in the standard DEK skeleton

```js
import { app, redis } from "@dekproject/scope";

redis.multi().set('foo', 'bar').get('foo').exec(function (err, results) {
    if(err) console.log(err);
    else console.log(results);
});
```
