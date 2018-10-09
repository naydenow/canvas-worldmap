import Grid from './grid';
import {regionFromPosition} from './utils';
import Picture from './picture';
import Highmap from './highmap';
import Сircle from './circle';
import renderShips from './render.ships';
import renderQuests from './render.quest';

export default class Map {
  constructor(element, map = {}, options = {}) {
    this._map               = map;
    this.element            = element;
    this.defLength          = options.defLength || 10;
    this.canRenderShips     = true;
    this.canRenderAreas     = true;
    this.canRenderQuests    = true;
    this.canRenderTeleports = true;
    this.canRenderGrid      = true;
    this.canRenderText      = true;

    this.ships     = [];
    this.areas     = [];
    this.quests    = [];
    this.teleports = [];

    this.pictures = [];
    this.highmap  = [];

    this.inited = false;
    this.opened = false;
    this.camera = {
      x:    0,
      y:    0,
      zoom: 2
    };

    this.mouseDown   = false;
    this.oldPosition = {x: null, y: null};
    this.parseMap();
  }

  setShips(ships) {
    this.ships = ships;
  }

  setQuests(quests) {
    this.quests = quests;
  }

  check(checkbox) {
    if (checkbox.id === 'q') {
      this.canRenderQuests = !this.canRenderQuests;
    } else if (checkbox.id === 'p') {
      this.canRenderTeleports = !this.canRenderTeleports;
    } else if (checkbox.id === 's') {
      this.canRenderShips = !this.canRenderShips;
    } else if (checkbox.id === 'a') {
      this.canRenderAreas = !this.canRenderAreas;
    } else if (checkbox.id === 'g') {
      this.canRenderGrid = !this.canRenderGrid;
    } else if (checkbox.id === 't') {
      this.canRenderText = !this.canRenderText;
    }
  }

  parseMap(map = this._map) {
    this.areas     = [];
    this.pictures  = [];
    this.quests    = [];
    this.teleports = [];
    this.highmap   = [];

    (map.areas || []).forEach(a => {
      this.areas.push(new Сircle(this, {x: a.position[0], y: a.position[2]}, a.position[3], a.color, a.name));
    });

    (map.pictures || []).forEach(p => {
      this.pictures.push(new Picture(this, {x: p.position[0], y: p.position[1]}, {url: p.url}, p.name));
    });

    (map.quests || []).forEach(p => {
      this.quests.push(new Picture(this, {x: p.position[0], y: p.position[1]}, {url: p.url}, p.name));
    });

    (map.teleports || []).forEach(p => {
      this.teleports.push(new Picture(this, {x: p.position[0], y: p.position[1]}, {url: p.url}, p.name));
    });

    (map.highmap || []).forEach(h => {
      this.highmap.push(new Highmap(this, h));
    });
  }

  goToRegion(region = this.grid.center, zoom) {
    if (zoom)
      this.camera.zoom = zoom;

    let r = region.split('=');

    this.grid.calcProp();

    this.camera.x = r[0] * this.grid._height * -1;
    this.camera.y = r[1] * this.grid._width * -1;

    this.grid.updateNearRegion(this.camera.zoom);
  }

  goToGlobalPosition(x, y, zoom = this.camera.zoom) {
    if (zoom)
      this.camera.zoom = zoom;

    let r = regionFromPosition(x, y).split('=');

    this.camera.x = r[0] * this.grid._height * -1;
    this.camera.y = r[1] * this.grid._width * -1;

    this.grid.updateNearRegion(this.camera.zoom);
  }

  zoom(z = this.camera.zoom) {
    this.goToRegion(void 0, z);
  }

  setShops(shops) {
    (shops || []).forEach(s => {
      this.areas.push(new Сircle(this, {x: s.position[0], y: s.position[2]}, s.position[3], '#b2461978', s.name));
    });
  }

  registerEvents() {
    this.canvas.addEventListener("wheel", (e) => {
      e.stopPropagation();
      var delta = e.deltaY || e.detail || e.wheelDelta;

      if (delta > 0) {
        this.camera.zoom += 0.2;
      } else {
        this.camera.zoom -= 0.2;
      }

      if (this.camera.zoom <= 0.4)
        this.camera.zoom = 0.4;

      if (this.camera.zoom > 6)
        this.camera.zoom = 6;

      this.zoom();
    });

    this.canvas.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      this.mouseDown = true;
    });

    document.addEventListener("mouseup", (e) => {
      e.stopPropagation();
      this.mouseDown   = false;
      this.oldPosition = {x: null, y: null};
    });

    this.canvas.addEventListener("mousemove", (e) => {
      e.stopPropagation();
      if (!this.mouseDown)
        return;

      if (this.oldPosition.x === null && this.oldPosition.y === null) {
        this.oldPosition = {
          x: e.x,
          y: e.y
        };

        return;
      }

      let _x = this.oldPosition.x - e.x;
      let _y = this.oldPosition.y - e.y;


      this.camera.x -= _x;
      this.camera.y -= _y;

      this.oldPosition = {
        x: e.x,
        y: e.y
      };
    });
  }

  open(x = 0, y = 0) {
    if (this.opened)
      return this.goToGlobalPosition(x, y);
    ;

    if (!this.inited)
      this.init();

    this.goToGlobalPosition(x, y);
    this.interval = setInterval(() => this.render(), 1000 / 60);
    this.opened   = true;
  }

  toggle() {
    if (this.opened)
      this.close();
    else
      this.open();
  }

  close() {
    if (!this.opened)
      return;

    clearInterval(this.interval);

    this.opened = false;
  }

  init() {
    this.canvas = document.getElementById(this.element);
    this.ctx    = this.canvas.getContext('2d');
    this.width  = this.canvas.width;
    this.height = this.canvas.height;
    this.grid   = new Grid(this);
    this.center = {
      x: this.width / 2,
      y: this.height / 2
    };

    this.registerEvents();
  }

  render() {
    if (this.mouseDown)
      this.grid.updateNearRegion();

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.pictures.forEach(e => e.render(this.ctx));

    this.canRenderTeleports && this.teleports.forEach(e => e.render(this.ctx));

    this.canRenderAreas && this.areas.forEach(e => e.render(this.ctx));

    this.canRenderShips && renderShips(this, this.ctx);

    this.canRenderQuests && renderQuests(this, this.ctx);

    this.grid.render(this.ctx);
  }
}