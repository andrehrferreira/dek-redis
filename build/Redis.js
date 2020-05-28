"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ioredis = require("ioredis");

var _ioredis2 = _interopRequireDefault(_ioredis);

var _snappy = require("snappy");

var _snappy2 = _interopRequireDefault(_snappy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Redis = function (_IORedis) {
    _inherits(Redis, _IORedis);

    function Redis(opts) {
        _classCallCheck(this, Redis);

        return _possibleConstructorReturn(this, (Redis.__proto__ || Object.getPrototypeOf(Redis)).call(this, opts));
    }

    _createClass(Redis, [{
        key: "setCompress",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key, value) {
                var buffer;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _snappy2.default.compressSync(value);

                            case 2:
                                buffer = _context.sent;
                                return _context.abrupt("return", this.setBuffer(key, buffer));

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function setCompress(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return setCompress;
        }()
    }, {
        key: "getCompress",
        value: function getCompress(key) {
            var _this2 = this;

            return new Promise(function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
                    var buffer;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return _this2.getBuffer(key);

                                case 3:
                                    buffer = _context2.sent;
                                    _context2.t0 = resolve;
                                    _context2.next = 7;
                                    return _snappy2.default.uncompressSync(buffer, { asBuffer: false });

                                case 7:
                                    _context2.t1 = _context2.sent;
                                    (0, _context2.t0)(_context2.t1);
                                    _context2.next = 14;
                                    break;

                                case 11:
                                    _context2.prev = 11;
                                    _context2.t2 = _context2["catch"](0);

                                    reject(_context2.t2);

                                case 14:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this2, [[0, 11]]);
                }));

                return function (_x3, _x4) {
                    return _ref2.apply(this, arguments);
                };
            }());
        }
    }]);

    return Redis;
}(_ioredis2.default);

exports.default = Redis;
//# sourceMappingURL=Redis.js.map