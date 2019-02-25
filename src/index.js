import { $ } from "@dekproject/scope";
import Redis from "ioredis";

export default async () => {
    try{
        let redisConfig = {};
        let env = process.env;
        let configApproved = true;

        // Check the existence of the parameters below in .env

        if(env.hasOwnProperty('REDIS_HOST') && !!env.REDIS_HOST)
            redisConfig['host'] = env.REDIS_HOST;
        else {
            configApproved = false;
            console.log('[ Redis Plugin ] - There is no REDIS_HOST variable in the .env file');
        }

        if(env.hasOwnProperty('REDIS_PORT') && !!env.REDIS_PORT)
            redisConfig['port'] = env.REDIS_PORT;
        else {
            configApproved = false;
            console.log('[ Redis Plugin ] - There is no REDIS_PORT variable in the .env file');
        }

        if(env.hasOwnProperty('REDIS_FAMILY') && !!env.REDIS_FAMILY)
            redisConfig['family'] = env.REDIS_FAMILY;

        if(env.hasOwnProperty('REDIS_PASSWORD') && !!env.REDIS_PASSWORD)
            redisConfig['password'] = env.REDIS_PASSWORD;

        if(env.hasOwnProperty('REDIS_DB') && !!env.REDIS_DB)
            redisConfig['db'] = env.REDIS_DB;

        if(!configApproved){
            console.log('[ Redis Plugin ] - Please correct the above errors before restarting the application.')
            process.exit(-1);
        }
        else {
            if(env.PLUGIN_DEBUG == 'true')
                console.log(`[ Redis Plugin ] - Successfully signed`);

            $.set("redis", new Redis(redisConfig));
        }
    }
    catch(e){
        console.log(`[ Redis Plugin ] - ${e.message}`)
    }
}
