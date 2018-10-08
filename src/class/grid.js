import {calcRegion, regionFromPosition} from './utils';

const defLength = 10;

export default class Grid {
  constructor(app) {
    this.app     = app;
    this.regions = [];
    this.center  = '0=0';
    this.calcProp();
    this.updateNearRegion(app.camera.zoom);
  }

  calcProp() {
    this.length  = defLength / this.app.camera.zoom;
    this._height = ~~(this.app.height / this.length + .5);
    this._width  = ~~(this.app.width / this.length + .5);

  }

  updateNearRegion(zoom = this.app.camera.zoom) {
    this.center  = regionFromPosition(this.app.camera.x * -1, this.app.camera.y * -1, (this._width + this._height) / 2);
    this.regions = calcRegion(this.center, ~~this.length);
  }

  render(ctx) {
    this.regions.forEach((r) => {
      let x = ~~(-this._width / 2 + this.app.camera.x + this.app.center.x + (r[0] * this._width) + .5);
      let y = ~~(-this._height / 2 + this.app.camera.y + this.app.center.y + (r[1] * this._height) + .5);

      if (this.app.canRenderGrid && this.app.camera.zoom >= 0.6) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + this._width, y);
      }

      if (this.app.camera.zoom > 0.7) {
        ctx.font      = `${22 - this.length * 1.4}px Comic Sans MS`;
        ctx.fillStyle = '#914f36';
        ctx.textAlign = "center";
        ctx.fillText(`${~~r[0]}=${~~r[1]}`, x + this._width / 2, y + this._height / 2);
      }

      if (this.app.canRenderGrid && this.app.camera.zoom >= 0.6) {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + this._height);
        ctx.strokeStyle = '#bc743c';
        ctx.stroke();
      }
    })
  }
}