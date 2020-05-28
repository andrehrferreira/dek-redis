import IORedis from "ioredis";
import snappy from "snappy";

class Redis extends IORedis {
    constructor(opts) {
        super(opts);
    }

    async setCompress (key, value, expiryMode, time) {
        if (typeof value == "object") {
            value = JSON.stringify(value);
        }
        let buffer = await snappy.compressSync(value);
        if (expiryMode && time)
            return this.setBuffer(key, buffer, expiryMode, time);
        return this.setBuffer(key, buffer);
    }

    getCompress (key, { json = true } = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                let buffer = await this.getBuffer(key);
                if (buffer) {
                    let uncompress = await snappy.uncompressSync(buffer, { asBuffer: false });

                    if (json) {
                        resolve(JSON.parse(uncompress));
                    } else {
                        resolve(uncompress);
                    }
                } else {
                    resolve(null)
                }
            }
            catch (err) {
                reject(err);
            }
        })
    }
}

export default Redis;