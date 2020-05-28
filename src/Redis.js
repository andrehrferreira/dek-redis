import IORedis from "ioredis";
import snappy from "snappy";

class Redis extends IORedis{
    constructor(opts) {
        super(opts);
    }

    async setCompress(key, value){
        let buffer = await snappy.compressSync(value);
        return this.setBuffer(key, buffer);
    }

    getCompress(key){
        return new Promise(async (resolve, reject) => {
            try{
                let buffer = await this.getBuffer(key);
                resolve(await snappy.uncompressSync(buffer, { asBuffer: false }));
            }
            catch(err){
                reject(err);
            }
        })
    }
}

export default Redis;