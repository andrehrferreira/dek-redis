"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Redis = require("./Redis");

var _Redis2 = _interopRequireDefault(_Redis);

var _LoadBalance = require("./LoadBalance");

var _LoadBalance2 = _interopRequireDefault(_LoadBalance);

var _scope = require("@dekproject/scope");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var redisConfig, env, configApproved, redis, redisLoadBalance;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    try {
                        redisConfig = {};
                        env = process.env;
                        configApproved = true;

                        // Check the existence of the parameters below in .env

                        if (Object.prototype.hasOwnProperty.call(env, "REDIS_HOST") && !!env.REDIS_HOST) redisConfig['host'] = env.REDIS_HOST;else {
                            configApproved = false;
                            console.log('[ Redis Plugin ] - There is no REDIS_HOST variable in the .env file');
                        }

                        if (Object.prototype.hasOwnProperty.call(env, "REDIS_PORT") && !!env.REDIS_PORT) redisConfig['port'] = env.REDIS_PORT;else {
                            configApproved = false;
                            console.log('[ Redis Plugin ] - There is no REDIS_PORT variable in the .env file');
                        }

                        if (Object.prototype.hasOwnProperty.call(env, "REDIS_FAMILY") && !!env.REDIS_FAMILY) redisConfig['family'] = env.REDIS_FAMILY;

                        if (Object.prototype.hasOwnProperty.call(env, "REDIS_PASSWORD") && !!env.REDIS_PASSWORD) redisConfig['password'] = env.REDIS_PASSWORD;

                        if (Object.prototype.hasOwnProperty.call(env, "REDIS_DB") && !!env.REDIS_DB) redisConfig['db'] = env.REDIS_DB;

                        if (Object.prototype.hasOwnProperty.call(env, "REDIS_SLAVES") && !!env.REDIS_SLAVES) redisConfig['slaves'] = env.REDIS_SLAVES.split(",");

                        if (!configApproved) {
                            console.log('[ Redis Plugin ] - Please correct the above errors before restarting the application.');
                            process.exit(-1);
                        } else {
                            try {
                                redis = Object.prototype.hasOwnProperty.call(env, "REDIS_URI") ? new _Redis2.default(env.REDIS_URI) : new _Redis2.default(redisConfig);


                                if (redis) _scope.$.set("redis", redis);

                                if (env.PLUGIN_DEBUG == 'true' && redis) console.log("[ Redis Plugin ] - Successfully signed");

                                if (Object.prototype.hasOwnProperty.call(env, "REDIS_SLAVES")) {
                                    redisLoadBalance = new _LoadBalance2.default(redisConfig['slaves']);

                                    _scope.$.set("redislb", redisLoadBalance);
                                }
                            } catch (e) {
                                console.log("[ Redis Plugin ] - " + e.message);
                            }
                        }
                    } catch (e) {
                        console.log("[ Redis Plugin ] - " + e.message);
                        reject();
                    }

                case 1:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}));
//# sourceMappingURL=index.js.map