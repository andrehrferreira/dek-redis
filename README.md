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
$ npm i -g @dekproject/redis
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
