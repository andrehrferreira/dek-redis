"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scope = require("@dekproject/scope");

var _ioredis = require("ioredis");

var _ioredis2 = _interopRequireDefault(_ioredis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var redisConfig, env, configApproved, redis;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    try {
                        redisConfig = {};
                        env = process.env;
                        configApproved = true;

                        // Check the existence of the parameters below in .env

                        if (env.hasOwnProperty('REDIS_HOST') && !!env.REDIS_HOST) redisConfig['host'] = env.REDIS_HOST;else {
                            configApproved = false;
                            console.log('[ Redis Plugin ] - There is no REDIS_HOST variable in the .env file');
                        }

                        if (env.hasOwnProperty('REDIS_PORT') && !!env.REDIS_PORT) redisConfig['port'] = env.REDIS_PORT;else {
                            configApproved = false;
                            console.log('[ Redis Plugin ] - There is no REDIS_PORT variable in the .env file');
                        }

                        if (env.hasOwnProperty('REDIS_FAMILY') && !!env.REDIS_FAMILY) redisConfig['family'] = env.REDIS_FAMILY;

                        if (env.hasOwnProperty('REDIS_PASSWORD') && !!env.REDIS_PASSWORD) redisConfig['password'] = env.REDIS_PASSWORD;

                        if (env.hasOwnProperty('REDIS_DB') && !!env.REDIS_DB) redisConfig['db'] = env.REDIS_DB;

                        if (!configApproved) {
                            console.log('[ Redis Plugin ] - Please correct the above errors before restarting the application.');
                            process.exit(-1);
                        } else {
                            try {
                                redis = new _ioredis2.default(redisConfig);


                                if (env.PLUGIN_DEBUG == 'true') console.log("[ Redis Plugin ] - Successfully signed");

                                _scope.$.set("redis", redis);
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