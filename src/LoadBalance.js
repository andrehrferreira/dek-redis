import Redis from "./Redis";

class RedisLoadBalance {
    constructor(settings){
        this.slaves = [];

        settings.forEach((slaveSettings) => {
            this.connectSlave(slaveSettings);
        });
    }

    connectSlave(slaveSettings){
        let slaveRedis = new Redis(slaveSettings);

        slaveRedis.on("connect", () => {
            if(process.env.DEBUG)
                console.log("[ Redis ] - Slave redis connected!", slaveSettings);
        });

        slaveRedis.on("error", (error) => {
            // eslint-disable-next-line no-console
            console.log(`[ Redis ] - ${error}`);
        });

        this.slaves.push(slaveRedis);
    }

    randSlaves(){
        return Math.floor(Math.random() * ((this.slaves.length-1) - 0 + 1)) + 0;
    }

    getSlave(){
        return this.slaves[this.randSlaves()];
    }
}

export default RedisLoadBalance;