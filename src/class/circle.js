import {calcRegion, regionFromPosition} from './utils';

const CUBSTEP = 2000;

export default class Сircle {
  constructor(app, position, radius, color, text) {
    this.app    = app;
    this.ready  = true;
    this.radius = radius;
    this.color  = color;
    this.text   = text;
    this.move(position.x, position.y);
  }

  move(x, y) {
    let _x = ( x / CUBSTEP );
    let _y = (y / CUBSTEP );

    this.region   = regionFromPosition(x, y).split('=');
    this.position = {x: _x, y: _y};
  }

  render(ctx) {
    if (!this.ready)
      return false;

    if (!this.app.grid.regions.some(r => r[0] == this.region[0] && r[1] == this.region[1]))
      return;

    let radius = this.radius / CUBSTEP * this.app.grid._height;
    let x      = ~~(this.app.camera.x + this.app.center.x + (this.position.x * this.app.grid._height ) + .5);
    let y      = ~~(this.app.camera.y + this.app.center.y + (this.position.y * this.app.grid._width) + .5);

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();


    if (this.app.canRenderText) {
      ctx.font      = `${22 - this.app.grid.length * 1.4}px Comic Sans MS`;
      ctx.fillStyle = '#914f36';
      ctx.textAlign = "center";
      ctx.fillText(`${this.text}`, x, y - 20);
    }


  }
}