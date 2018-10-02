import {calcRegion} from './utils';
const defLength = 20;

export default class Grid {
  constructor(app) {
    this.app     = app;
    this.regions = [];
    this.center  = '0=0';
    this.length  = defLength / app.camera.zoom;
    this.updateNearRegion();
  }

  updateNearRegion() {
    this._heigth = ~~(this.app.height / this.length + .5);
    this._width = ~~(this.app.width / this.length + .5);
    this.regions = calcRegion(this.center, this.length)
  }

  render(ctx) {
    if (defLength / this.app.camera.zoom !== this.length){
      this.length = defLength /  this.app.camera.zoom;
      this.updateNearRegion();
    }

    this.regions.forEach((r) => {
      let x = this.app.camera.x + this.app.center.x + r[0] * this._width;
      let y = this.app.camera.y + this.app.center.x + r[1] * this._heigth;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x+this._width , y);

      ctx.moveTo(x, y);
      ctx.lineTo(x, y + this._heigth);
      ctx.stroke();
    })
  }
}