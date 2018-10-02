import Grid from './grid';

export default class Map {
  constructor(element) {
    this.element  = element;
    this.children = [];
    this.inited   = false;
    this.opened   = false;
    this.camera   = {
      x:    0,
      y:    0,
      r:    '0=0',
      zoom: 3
    }
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
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.children.push(new Grid(this));
    this.center = {
      x:this.width/2,
      y: this.height/2
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width , this.height);
    this.children.forEach(e => e.render(this.ctx));
  }
}