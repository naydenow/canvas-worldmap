import {calcRegion, regionFromPosition} from './utils';

const CUBSTEP = 2000;

export default class Picture {
  constructor(app, position, image, text, canZoom = true) {
    this.canZoom      = canZoom;
    this.text         = text;
    this.app          = app;
    this.rawImage     = image;
    this.ready        = false;
    this.image        = new Image();
    this.angle        = 1;
    this.image.src    = image.url;
    this.needRotate   = false;
    this.image.onload = () => {
      this.ready = true;
    };

    this.move(position.x, position.y);
  }

  move(x, y, a) {
    let _x = ( x / CUBSTEP );
    let _y = (y / CUBSTEP );

    this.region   = regionFromPosition(x, y).split('=');
    this.position = {x: _x, y: _y};

    if (a && a !== this.angle) {
      this.angle      = a;
      this.needRotate = true;
    }
  }

  render(ctx) {
    if (!this.ready)
      return false;

    if (!this.app.grid.regions.some(r => r[0] == this.region[0] && r[1] == this.region[1]))
      return;

    let height = this.image.height * (this.canZoom ? this.app.camera.zoom : 1);
    let width  = this.image.width * (this.canZoom ? this.app.camera.zoom : 1);

    let x = ~~(-width / 2 + this.app.camera.x + this.app.center.x + (this.position.x * this.app.grid._height ) + .5);
    let y = ~~(-height / 2 + this.app.camera.y + this.app.center.y + (this.position.y * this.app.grid._width) + .5);

    ctx.save();
    ctx.beginPath();

    if (this.needRotate) {
      ctx.translate(x + width / 2, y + height / 2);

      ctx.rotate(this.angle * Math.PI / 180);

      ctx.translate(-(x + width / 2), -(y + height / 2));

      this.needRotate = false;
    }

    ctx.drawImage(this.image, x, y, width, height);

    ctx.closePath();
    ctx.restore();


    if (this.text && this.app.canRenderText) {
      ctx.font      = `${22 - this.app.grid.length * 1.4}px Comic Sans MS`;
      ctx.fillStyle = '#914f36';
      ctx.textAlign = "center";
      ctx.fillText(`${this.text}`, x, y);
    }

  }
}