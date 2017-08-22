"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");

var Plate = function (_abstract) {
  _inherits(Plate, _abstract);

  function Plate(screenManager) {
    _classCallCheck(this, Plate);

    var _this = _possibleConstructorReturn(this, (Plate.__proto__ || Object.getPrototypeOf(Plate)).call(this, screenManager));

    _this.currentViewID = 0;
    return _this;
  }

  _createClass(Plate, [{
    key: "init",
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(plate) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.setScreen("plate");

              case 2:

                this.plate = plate;
                _context2.next = 5;
                return this.nanoDLP.getProfiles();

              case 5:
                this.profiles = _context2.sent;

                this.profile = this.profiles[_lodash2.default.findIndex(this.profiles, { ProfileID: this.plate.ProfileID })];

                this.setText("t0", this.plate.Path);
                this.setText("t1", this.profile.Title + " (" + this.profile.Depth + "um)");
                this.setText("t3", this.plate.TotalSolidArea + "ml");
                this.setText("t7", this.plate.LayersCount + " layers");

                this.addListener("click_b2", function (e) {
                  _this2.changePage("plates");
                });

                this.addListener("click_b9", _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _this2.nanoDLP.command("/printer/start/" + _this2.plate.PlateID);

                        case 2:
                          _this2.changePage("home");

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, _this2);
                })));
                /*
                this.addListener("click_b12", (e)=>{
                  this.set3DView(++this.currentViewID);
                });
                */
                this.gap = 100 / this.plate.LayersCount;

                this.addListener("number", function (index) {
                  index = Math.floor(index / _this2.gap);
                  _this2.setLayer(index);
                });

                _context2.next = 17;
                return this.setLayer(1);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function init(_x) {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "set3DView",
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(index) {
        var image;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.setText("t12", "Loading ");

              case 2:
                _context3.next = 4;
                return this.manager.nanoDLP.getCurrentPlate3DView(this.plate.PlateID, this.currentViewID % 4);

              case 4:
                image = _context3.sent;
                _context3.next = 7;

                // Change here:
                // open the following line according to your size of nextion screen to fix the position of
                // display image, should change to not fixed value by read the width/height from nextion screen

		        // for 2.4' or 2.8' nextion screen, open it, close the others
                return this.nextion.displayBlackWhiteImage(image, 153, 49, 167).catch(function (e) {
                
	            // for 3.2' nextion screen, open it, close the others
                //return this.nextion.displayBlackWhiteImage(image, 235, 50, 165).catch(function (e) {

		        // for 3.5' nextion screen, open it, close the others
                //return this.nextion.displayBlackWhiteImage(image, 243, 51, 237).catch(function (e) {
                
                  return console.error(e);
                });

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function set3DView(_x2) {
        return _ref3.apply(this, arguments);
      }

      return set3DView;
    }()
  }, {
    key: "setLayer",
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(index) {
        var image;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.index = index == 0 ? 1 : index;

                _context4.next = 3;
                return this.setText("t12", "Loading " + this.index + "/" + this.plate.LayersCount);

              case 3:
                this.setText("t9", "layer " + this.index + "/" + this.plate.LayersCount);
                _context4.next = 6;
                return this.nanoDLP.getCurrentPlateLayer(this.plate.PlateID, this.index);

              case 6:
                image = _context4.sent;
                _context4.next = 9;

                // Change here:
                // open the following line according to your size of nextion screen to fix the position of
                // display image, should change to not fixed value by read the width/height from nextion screen

		        // for 2.4' or 2.8' nextion screen, open it, close the others
                return this.nextion.displayBlackWhiteImage(image, 153, 49, 167).catch(function (e) {
                
	            // for 3.2' nextion screen, open it, close the others
                //return this.nextion.displayBlackWhiteImage(image, 235, 50, 165).catch(function (e) {

		        // for 3.5' nextion screen, open it, close the others
                //return this.nextion.displayBlackWhiteImage(image, 243, 51, 237).catch(function (e) {
                  return console.error(e);
                });

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setLayer(_x3) {
        return _ref4.apply(this, arguments);
      }

      return setLayer;
    }()
  }]);

  return Plate;
}(_abstract3.default);

exports.default = Plate;
