import IORedis from "ioredis";
import snappy from "snappy";

class Redis extends IORedis {
    constructor(opts) {
        super(opts);
    }

    async setCompress (key, value) {
        if (typeof value == "object") {
            value = JSON.stringify(value);
        }
        let buffer = await snappy.compressSync(value);
        return this.setBuffer(key, buffer);
    }

    getCompress (key, { json = true } = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                let buffer = await this.getBuffer(key);
                let uncompress = await snappy.uncompressSync(buffer, { asBuffer: false });
                
                if (json) {
                    resolve(JSON.parse(uncompress));
                } else {
                    resolve(uncompress);
                }
            }
            catch (err) {
                reject(err);
            }
        })
    }
}

export default Redis;