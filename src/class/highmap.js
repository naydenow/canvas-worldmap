import {calcRegion, regionFromPosition} from './utils';

const CUBSTEP = 2000;

export default class Highmap {
  constructor(app, region) {
    this.app          = app;
    this.ready        = false;
    this.image        = new Image();
    this.image.src    = `https://ww.sunnygames.net/terrain/world/main/${region}/hm.png`;
    this.image.onload = () => {
      this.i = this.removeBlack(this.image);
      this.ready = true;
    };
    let r             = region.split('=');
    this.move(r[0] * CUBSTEP, r[1] * CUBSTEP);
  }

  removeBlack(img) {
    var buffer    = document.createElement('canvas');
    var bufferctx = buffer.getContext('2d');
    bufferctx.drawImage(img, 0, 0);
    var imageData = bufferctx.getImageData(0, 0, buffer.width, buffer.height);
    var data      = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
      if (data[i] + data[i + 1] + data[i + 2] < 10) {
        data[i + 3] = 0; // alpha
      }
    }

    return imageData;
    //ctx.putImageData(imageData, 0, 0);
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

    let height = this.app.grid._height;
    let width  = this.app.grid._width;

    let x = ~~(-width / 2 + this.app.camera.x + this.app.center.x + (this.position.x * this.app.grid._height ) + .5);
    let y = ~~(-height / 2 + this.app.camera.y + this.app.center.y + (this.position.y * this.app.grid._width) + .5);

    ctx.putImageData(this.i, x, y, width, height);
  }
}