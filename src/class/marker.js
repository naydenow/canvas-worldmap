import {calcRegion, regionFromPosition} from './utils';
const CUBSTEP = 2000;
const defLength = 20;

export default class Marker {
  constructor(app, position, image) {
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
    let _x = ( ( (x > 0 ? CUBSTEP/2 : -CUBSTEP/2) + x ) / CUBSTEP );
    let _y =  (( (y > 0 ? CUBSTEP/2 : -CUBSTEP/2) + y ) / CUBSTEP );

    this.region   = regionFromPosition(x, y).split('=');
    this.position = {x:_x, y:_y};

    console.log(this)
  }

  render(ctx) {
    if (!this.ready)
      return false;

    if(!this.app.grid.regions.some(r => r[0] == this.region[0] && r[1] == this.region[1]))
      return;

    let height = this.image.height * this.app.camera.zoom;
    let width  = this.image.width * this.app.camera.zoom;

    let x = ~~(-width / 2 + this.app.camera.x + this.app.center.x + this.position.x * width + .5);
    let y = ~~(this.app.camera.y + this.app.center.y + this.position.y * height + .5);

    ctx.drawImage(this.image, x, y, width, height);
  }
}