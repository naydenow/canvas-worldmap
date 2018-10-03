import {calcRegion, regionFromPosition} from './utils';

const CUBSTEP = 2000;

export default class Picture {
  constructor(app, position, image, text) {
    this.text         = text;
    this.app          = app;
    this.rawImage     = image;
    this.ready        = false;
    this.image        = new Image();
    this.image.src    = image.url;
    this.image.onload = () => {
      this.ready = true;
    };

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

    let height = this.image.height * this.app.camera.zoom;
    let width  = this.image.width * this.app.camera.zoom;

    let x = ~~(-width / 2 + this.app.camera.x + this.app.center.x + (this.position.x * this.app.grid._height ) + .5);
    let y = ~~(-height / 2 + this.app.camera.y + this.app.center.y + (this.position.y * this.app.grid._width) + .5);

    ctx.drawImage(this.image, x, y, width, height);

    if (this.text) {
      ctx.font      = `${22 - this.app.grid.length * 1.4}px Comic Sans MS`;
      ctx.fillStyle = '#914f36';
      ctx.textAlign = "center";
      ctx.fillText(`${this.text}`, x, y);
    }
  }
}