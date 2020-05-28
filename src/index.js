import Redis from "./Redis";
import LoadBalance from "./LoadBalance";

import { $ } from "@dekproject/scope";

export default async () => {
    try{
        let redisConfig = {};
        let env = process.env;
        let configApproved = true;

        // Check the existence of the parameters below in .env

        if(Object.prototype.hasOwnProperty.call(env, "REDIS_HOST") && !!env.REDIS_HOST)
            redisConfig['host'] = env.REDIS_HOST;
        else {
            configApproved = false;
            console.log('[ Redis Plugin ] - There is no REDIS_HOST variable in the .env file');
        }

        if(Object.prototype.hasOwnProperty.call(env, "REDIS_PORT") && !!env.REDIS_PORT)
            redisConfig['port'] = env.REDIS_PORT;
        else {
            configApproved = false;
            console.log('[ Redis Plugin ] - There is no REDIS_PORT variable in the .env file');
        }

        if(Object.prototype.hasOwnProperty.call(env, "REDIS_FAMILY") && !!env.REDIS_FAMILY)
            redisConfig['family'] = env.REDIS_FAMILY;

        if(Object.prototype.hasOwnProperty.call(env, "REDIS_PASSWORD") && !!env.REDIS_PASSWORD)
            redisConfig['password'] = env.REDIS_PASSWORD;

        if(Object.prototype.hasOwnProperty.call(env, "REDIS_DB") && !!env.REDIS_DB)
            redisConfig['db'] = env.REDIS_DB;

        if(Object.prototype.hasOwnProperty.call(env, "REDIS_SLAVES") && !!env.REDIS_SLAVES)
            redisConfig['slaves'] = env.REDIS_SLAVES.split(",");

        if(!configApproved){
            console.log('[ Redis Plugin ] - Please correct the above errors before restarting the application.')
            process.exit(-1);
        }
        else {
            try {
                let redis = (Object.prototype.hasOwnProperty.call(env, "REDIS_URI")) ? new Redis(env.REDIS_URI) : new Redis(redisConfig);

                if(redis)
                    $.set("redis", redis);
                
                if(env.PLUGIN_DEBUG == 'true' && redis)
                    console.log(`[ Redis Plugin ] - Successfully signed`);            

                if(Object.prototype.hasOwnProperty.call(env, "REDIS_SLAVES")){
                    let redisLoadBalance = new LoadBalance(redisConfig['slaves']);
                    $.set("redislb", redisLoadBalance);
                }
            }
            catch (e) {
                console.log(`[ Redis Plugin ] - ${e.message}`);
            }
        }
    }
    catch(e){
        console.log(`[ Redis Plugin ] - ${e.message}`);
        reject();
    }
}
