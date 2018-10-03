import {calcRegion, regionFromPosition} from './utils';

const defLength = 20;

export default class Grid {
  constructor(app) {
    this.app     = app;
    this.regions = [];
    this.center  = '0=0';
    this.updateNearRegion(app.camera.zoom);
  }

  updateNearRegion(zoom = this.app.camera.zoom) {
    this.length  = defLength / zoom;
    this._height = ~~(this.app.height / this.length + .5);
    this._width  = ~~(this.app.width / this.length + .5);

    this.center  = regionFromPosition(this.app.camera.x * -1, this.app.camera.y * -1, (this._width + this._height) / 2);
    this.regions = calcRegion(this.center, ~~this.length);
  }

  render(ctx) {
    this.regions.forEach((r) => {
      let x = ~~(-this._width / 2 + this.app.camera.x + this.app.center.x + r[0] * this._width + .5);
      let y = ~~(-this._height / 2 + this.app.camera.y + this.app.center.y + r[1] * this._height + .5);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + this._width, y);

      if (this.app.camera.zoom > 1) {
        ctx.font      = `${20 - this.length}px Comic Sans MS`;
        ctx.textAlign = "center";
        ctx.fillText(`${~~r[0]}=${~~r[1]}`, x + this._width / 2, y + this._height / 2);
      }

      ctx.moveTo(x, y);
      ctx.lineTo(x, y + this._height);
      ctx.strokeStyle = '#bc743c';
      ctx.stroke();
    })
  }
}