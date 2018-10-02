/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_js_1 = __webpack_require__(1);
window.map = new map_js_1.default('world-map');


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var grid_1 = __webpack_require__(2);
var Map = /** @class */ (function () {
    function Map(element) {
        this.element = element;
        this.children = [];
        this.inited = false;
        this.opened = false;
        this.camera = {
            x: 0,
            y: 0,
            r: '0=0',
            zoom: 3
        };
    }
    Map.prototype.open = function () {
        var _this = this;
        if (this.opened)
            return;
        if (!this.inited)
            this.init();
        this.interval = setInterval(function () { return _this.render(); }, 1000 / 60);
        this.opened = true;
    };
    Map.prototype.toggle = function () {
        if (this.opened)
            this.close();
        else
            this.open();
    };
    Map.prototype.close = function () {
        if (!this.opened)
            return;
        clearInterval(this.interval);
        this.opened = false;
    };
    Map.prototype.init = function () {
        this.canvas = document.getElementById(this.element);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.children.push(new grid_1.default(this));
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        };
    };
    Map.prototype.render = function () {
        var _this = this;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.children.forEach(function (e) { return e.render(_this.ctx); });
    };
    return Map;
}());
exports.default = Map;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(3);
var defLength = 20;
var Grid = /** @class */ (function () {
    function Grid(app) {
        this.app = app;
        this.regions = [];
        this.center = '0=0';
        this.length = defLength / app.camera.zoom;
        this.updateNearRegion();
    }
    Grid.prototype.updateNearRegion = function () {
        this._heigth = ~~(this.app.height / this.length + .5);
        this._width = ~~(this.app.width / this.length + .5);
        this.regions = utils_1.calcRegion(this.center, this.length);
    };
    Grid.prototype.render = function (ctx) {
        var _this = this;
        if (defLength / this.app.camera.zoom !== this.length) {
            this.length = defLength / this.app.camera.zoom;
            this.updateNearRegion();
        }
        this.regions.forEach(function (r) {
            var x = _this.app.camera.x + _this.app.center.x + r[0] * _this._width;
            var y = _this.app.camera.y + _this.app.center.x + r[1] * _this._heigth;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + _this._width, y);
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + _this._heigth);
            ctx.stroke();
        });
    };
    return Grid;
}());
exports.default = Grid;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CUBSTEP = 2000;
exports.calcRegion = function (region, length) {
    var _r = region.split('=').map(function (r) {
        return +r;
    });
    var all = length ? length : 2;
    var res = [];
    var h = all * -1;
    var i = 0;
    while (h <= all) {
        var w = all * -1;
        while (w <= all) {
            res.push([_r[0] + w, _r[1] + h]);
            w++;
        }
        h++;
    }
    return res;
};
exports.regionFromPosition = function (x, z) {
    var _x = _z = CUBSTEP / 2;
    if (x < 0) {
        _x = -_x;
    }
    if (z < 0) {
        _z = -_z;
    }
    var x = ~~(((_x + x) / CUBSTEP));
    var z = ~~(((_z + z) / CUBSTEP));
    return x + '=' + z;
};


/***/ })
/******/ ]);