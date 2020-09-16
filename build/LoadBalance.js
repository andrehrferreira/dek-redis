"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Redis = require("./Redis");

var _Redis2 = _interopRequireDefault(_Redis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RedisLoadBalance = function () {
    function RedisLoadBalance(settings) {
        var _this = this;

        _classCallCheck(this, RedisLoadBalance);

        this.slaves = [];

        settings.forEach(function (slaveSettings) {
            _this.connectSlave(slaveSettings);
        });
    }

    _createClass(RedisLoadBalance, [{
        key: "connectSlave",
        value: function connectSlave(slaveSettings) {
            var slaveRedis = new _Redis2.default(slaveSettings);

            slaveRedis.on("connect", function () {
                //if(process.env.DEBUG)
                //    console.log("[ Redis ] - Slave redis connected!", slaveSettings);
            });

            slaveRedis.on("error", function (error) {
                // eslint-disable-next-line no-console
                console.log("[ Redis ] - " + error);
            });

            this.slaves.push(slaveRedis);
        }
    }, {
        key: "randSlaves",
        value: function randSlaves() {
            return Math.floor(Math.random() * (this.slaves.length - 1 - 0 + 1)) + 0;
        }
    }, {
        key: "getSlave",
        value: function getSlave() {
            return this.slaves[this.randSlaves()];
        }
    }]);

    return RedisLoadBalance;
}();

exports.default = RedisLoadBalance;
//# sourceMappingURL=LoadBalance.js.map