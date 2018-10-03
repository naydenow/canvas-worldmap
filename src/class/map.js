import Grid from './grid';
import {regionFromPosition} from './utils';
import Marker from './marker';

export default class Map {
  constructor(element) {
    this.element  = element;
    this.children = [];
    this.inited   = false;
    this.opened   = false;
    this.camera   = {
      x:    0,
      y:    0,
      zoom: 1
    };

    this.mouseDown   = false;
    this.oldPosition = {x: null, y: null};
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

  zoom(z = this.camera.zoom){
    this.goToRegion(void 0,z);
  }

  registerEvents() {

    this.canvas.addEventListener("wheel", (e) => {
      var delta = e.deltaY || e.detail || e.wheelDelta;

      if (delta > 0) {
        this.camera.zoom += 0.4;
      } else {
        this.camera.zoom -= 0.4;
      }

      if (this.camera.zoom <= 0.8)
        this.camera.zoom = 0.8;

      if (this.camera.zoom > 5)
        this.camera.zoom = 5;

      this.zoom();
    });


    this.canvas.addEventListener("mousedown", (e) => {
      this.mouseDown = true;
    });

    document.addEventListener("mouseup", (e) => {
      this.mouseDown   = false;
      this.oldPosition = {x: null, y: null};
    });

    this.canvas.addEventListener("mousemove", (e) => {
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

  open() {
    if (this.opened)
      return;

    if (!this.inited)
      this.init();

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
    this.children.push(this.grid);
    this.center = {
      x: this.width / 2,
      y: this.height / 2
    };

    this.registerEvents();

    this.children.push(new Marker(this,{x:1000,y:1000},{url:'assets/ship.png'} ))
    this.children.push(new Marker(this,{x:3000,y:5000},{url:'assets/ship.png'} ))
    this.children.push(new Marker(this,{x:1000,y:-4000},{url:'assets/ship.png'} ))
  }

  render() {
    if (this.mouseDown)
      this.grid.updateNearRegion();

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.children.forEach(e => e.render(this.ctx));
  }
}