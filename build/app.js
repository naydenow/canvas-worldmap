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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.regionFromPosition = function (x, y, CUBSTEP) {
    if (CUBSTEP === void 0) { CUBSTEP = 2000; }
    var _x = CUBSTEP / 2;
    var _y = _x;
    return ~~(((x > 0 ? _x : -_x) + x) / CUBSTEP) + "=" + ~~(((y > 0 ? _y : -_y) + y) / CUBSTEP);
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_js_1 = __webpack_require__(2);
var _map = {
    areas: [
        {
            name: "Базовый магазин",
            position: [-17984, 0, 18683, 2000],
            color: '#bc743c45'
        },
        {
            name: "Базовый магазин",
            position: [-0, 0, 0, 2000],
            color: '#bc243c45'
        }
    ],
    pictures: [
        {
            position: [1000, -4000],
            url: 'assets/ship.png'
        }
    ],
    quests: [
        {
            position: [-1500, -4500],
            url: 'assets/cross.png',
            name: "Имя точки",
        },
        {
            position: [4000, -4000],
            url: 'assets/point.png',
            name: "Имя другой точки",
        }
    ]
};
window.map = new map_js_1.default('world-map', _map);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var grid_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var picture_1 = __webpack_require__(6);
var highmap_1 = __webpack_require__(7);
var circle_1 = __webpack_require__(5);
var Map = /** @class */ (function () {
    function Map(element, map) {
        this._map = map;
        this.element = element;
        this.markers = [];
        this.areas = [];
        this.pictures = [];
        this.highmap = [];
        this.quests = [];
        this.inited = false;
        this.opened = false;
        this.camera = {
            x: 0,
            y: 0,
            zoom: 1
        };
        this.mouseDown = false;
        this.oldPosition = { x: null, y: null };
        this.parseMap();
    }
    Map.prototype.parseMap = function () {
        var _this = this;
        (this._map.areas || []).forEach(function (a) {
            _this.areas.push(new circle_1.default(_this, { x: a.position[0], y: a.position[2] }, a.position[3], a.color, a.name));
        });
        (this._map.pictures || []).forEach(function (p) {
            _this.pictures.push(new picture_1.default(_this, { x: p.position[0], y: p.position[1] }, { url: p.url }, p.name));
        });
        (this._map.quests || []).forEach(function (p) {
            _this.quests.push(new picture_1.default(_this, { x: p.position[0], y: p.position[1] }, { url: p.url }, p.name));
        });
        (this._map.highmap || []).forEach(function (h) {
            _this.highmap.push(new highmap_1.default(_this, h));
        });
    };
    Map.prototype.goToRegion = function (region, zoom) {
        if (region === void 0) { region = this.grid.center; }
        if (zoom)
            this.camera.zoom = zoom;
        var r = region.split('=');
        this.grid.calcProp();
        this.camera.x = r[0] * this.grid._height * -1;
        this.camera.y = r[1] * this.grid._width * -1;
        this.grid.updateNearRegion(this.camera.zoom);
    };
    Map.prototype.goToGlobalPosition = function (x, y, zoom) {
        if (zoom === void 0) { zoom = this.camera.zoom; }
        if (zoom)
            this.camera.zoom = zoom;
        var r = utils_1.regionFromPosition(x, y).split('=');
        this.camera.x = r[0] * this.grid._height * -1;
        this.camera.y = r[1] * this.grid._width * -1;
        this.grid.updateNearRegion(this.camera.zoom);
    };
    Map.prototype.zoom = function (z) {
        if (z === void 0) { z = this.camera.zoom; }
        this.goToRegion(void 0, z);
    };
    Map.prototype.registerEvents = function () {
        var _this = this;
        this.canvas.addEventListener("wheel", function (e) {
            var delta = e.deltaY || e.detail || e.wheelDelta;
            if (delta > 0) {
                _this.camera.zoom += 0.4;
            }
            else {
                _this.camera.zoom -= 0.4;
            }
            if (_this.camera.zoom <= 0.8)
                _this.camera.zoom = 0.8;
            if (_this.camera.zoom > 5)
                _this.camera.zoom = 5;
            _this.zoom();
        });
        this.canvas.addEventListener("mousedown", function (e) {
            _this.mouseDown = true;
        });
        document.addEventListener("mouseup", function (e) {
            _this.mouseDown = false;
            _this.oldPosition = { x: null, y: null };
        });
        this.canvas.addEventListener("mousemove", function (e) {
            if (!_this.mouseDown)
                return;
            if (_this.oldPosition.x === null && _this.oldPosition.y === null) {
                _this.oldPosition = {
                    x: e.x,
                    y: e.y
                };
                return;
            }
            var _x = _this.oldPosition.x - e.x;
            var _y = _this.oldPosition.y - e.y;
            _this.camera.x -= _x;
            _this.camera.y -= _y;
            _this.oldPosition = {
                x: e.x,
                y: e.y
            };
        });
    };
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
        this.grid = new grid_1.default(this);
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        };
        this.registerEvents();
    };
    Map.prototype.render = function () {
        var _this = this;
        if (this.mouseDown)
            this.grid.updateNearRegion();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.highmap.forEach(function (e) { return e.render(_this.ctx); });
        this.pictures.forEach(function (e) { return e.render(_this.ctx); });
        this.areas.forEach(function (e) { return e.render(_this.ctx); });
        this.markers.forEach(function (e) { return e.render(_this.ctx); });
        this.quests.forEach(function (e) { return e.render(_this.ctx); });
        this.grid.render(this.ctx);
    };
    return Map;
}());
exports.default = Map;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
var defLength = 10;
var Grid = /** @class */ (function () {
    function Grid(app) {
        this.app = app;
        this.regions = [];
        this.center = '0=0';
        this.calcProp();
        this.updateNearRegion(app.camera.zoom);
    }
    Grid.prototype.calcProp = function () {
        this.length = defLength / this.app.camera.zoom;
        this._height = ~~(this.app.height / this.length + .5);
        this._width = ~~(this.app.width / this.length + .5);
    };
    Grid.prototype.updateNearRegion = function (zoom) {
        if (zoom === void 0) { zoom = this.app.camera.zoom; }
        this.center = utils_1.regionFromPosition(this.app.camera.x * -1, this.app.camera.y * -1, (this._width + this._height) / 2);
        this.regions = utils_1.calcRegion(this.center, ~~this.length);
    };
    Grid.prototype.render = function (ctx) {
        var _this = this;
        this.regions.forEach(function (r) {
            var x = ~~(-_this._width / 2 + _this.app.camera.x + _this.app.center.x + (r[0] * _this._width) + .5);
            var y = ~~(-_this._height / 2 + _this.app.camera.y + _this.app.center.y + (r[1] * _this._height) + .5);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + _this._width, y);
            if (_this.app.camera.zoom > .1) {
                ctx.font = 22 - _this.length * 1.4 + "px Comic Sans MS";
                ctx.fillStyle = '#914f36';
                ctx.textAlign = "center";
                ctx.fillText(~~r[0] + "=" + ~~r[1], x + _this._width / 2, y + _this._height / 2);
            }
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + _this._height);
            ctx.strokeStyle = '#bc743c';
            ctx.stroke();
        });
    };
    return Grid;
}());
exports.default = Grid;


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
var CUBSTEP = 2000;
var Сircle = /** @class */ (function () {
    function Сircle(app, position, radius, color, text) {
        this.app = app;
        this.ready = true;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.move(position.x, position.y);
    }
    Сircle.prototype.move = function (x, y) {
        var _x = (x / CUBSTEP);
        var _y = (y / CUBSTEP);
        this.region = utils_1.regionFromPosition(x, y).split('=');
        this.position = { x: _x, y: _y };
    };
    Сircle.prototype.render = function (ctx) {
        var _this = this;
        if (!this.ready)
            return false;
        if (!this.app.grid.regions.some(function (r) { return r[0] == _this.region[0] && r[1] == _this.region[1]; }))
            return;
        var radius = this.radius / CUBSTEP * this.app.grid._height;
        var x = ~~(this.app.camera.x + this.app.center.x + (this.position.x * this.app.grid._height) + .5);
        var y = ~~(this.app.camera.y + this.app.center.y + (this.position.y * this.app.grid._width) + .5);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.font = 22 - this.app.grid.length * 1.4 + "px Comic Sans MS";
        ctx.fillStyle = '#914f36';
        ctx.textAlign = "center";
        ctx.fillText("" + this.text, x, y - 20);
    };
    return Сircle;
}());
exports.default = Сircle;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
var CUBSTEP = 2000;
var Picture = /** @class */ (function () {
    function Picture(app, position, image, text) {
        var _this = this;
        this.text = text;
        this.app = app;
        this.rawImage = image;
        this.ready = false;
        this.image = new Image();
        this.image.src = image.url;
        this.image.onload = function () {
            _this.ready = true;
        };
        this.move(position.x, position.y);
    }
    Picture.prototype.move = function (x, y) {
        var _x = (x / CUBSTEP);
        var _y = (y / CUBSTEP);
        this.region = utils_1.regionFromPosition(x, y).split('=');
        this.position = { x: _x, y: _y };
    };
    Picture.prototype.render = function (ctx) {
        var _this = this;
        if (!this.ready)
            return false;
        if (!this.app.grid.regions.some(function (r) { return r[0] == _this.region[0] && r[1] == _this.region[1]; }))
            return;
        var height = this.image.height * this.app.camera.zoom;
        var width = this.image.width * this.app.camera.zoom;
        var x = ~~(-width / 2 + this.app.camera.x + this.app.center.x + (this.position.x * this.app.grid._height) + .5);
        var y = ~~(-height / 2 + this.app.camera.y + this.app.center.y + (this.position.y * this.app.grid._width) + .5);
        ctx.drawImage(this.image, x, y, width, height);
        if (this.text) {
            ctx.font = 22 - this.app.grid.length * 1.4 + "px Comic Sans MS";
            ctx.fillStyle = '#914f36';
            ctx.textAlign = "center";
            ctx.fillText("" + this.text, x, y);
        }
    };
    return Picture;
}());
exports.default = Picture;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
var CUBSTEP = 2000;
var Highmap = /** @class */ (function () {
    function Highmap(app, region) {
        var _this = this;
        this.app = app;
        this.ready = false;
        this.image = new Image();
        this.image.src = "https://ww.sunnygames.net/terrain/world/main/" + region + "/hm.png";
        this.image.onload = function () {
            _this.i = _this.removeBlack(_this.image);
            _this.ready = true;
        };
        var r = region.split('=');
        this.move(r[0] * CUBSTEP, r[1] * CUBSTEP);
    }
    Highmap.prototype.removeBlack = function (img) {
        var buffer = document.createElement('canvas');
        var bufferctx = buffer.getContext('2d');
        bufferctx.drawImage(img, 0, 0);
        var imageData = bufferctx.getImageData(0, 0, buffer.width, buffer.height);
        var data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
            if (data[i] + data[i + 1] + data[i + 2] < 10) {
                data[i + 3] = 0; // alpha
            }
        }
        return imageData;
        //ctx.putImageData(imageData, 0, 0);
    };
    Highmap.prototype.move = function (x, y) {
        var _x = (x / CUBSTEP);
        var _y = (y / CUBSTEP);
        this.region = utils_1.regionFromPosition(x, y).split('=');
        this.position = { x: _x, y: _y };
    };
    Highmap.prototype.render = function (ctx) {
        var _this = this;
        if (!this.ready)
            return false;
        if (!this.app.grid.regions.some(function (r) { return r[0] == _this.region[0] && r[1] == _this.region[1]; }))
            return;
        var height = this.app.grid._height;
        var width = this.app.grid._width;
        var x = ~~(-width / 2 + this.app.camera.x + this.app.center.x + (this.position.x * this.app.grid._height) + .5);
        var y = ~~(-height / 2 + this.app.camera.y + this.app.center.y + (this.position.y * this.app.grid._width) + .5);
        ctx.putImageData(this.i, x, y, width, height);
    };
    return Highmap;
}());
exports.default = Highmap;


/***/ })
/******/ ]);