import Picture from './picture';

const _ship = new Picture(null, {x: 0, y: 0}, {url: 'assets/brownship.png'}, false, false);
const player = new Picture(null, {x: 0, y: 0}, {url: 'assets/player.png'}, false, false);

export default function (app, ctx) {
  // console.log(app.ships)
  for (let key in app.ships) {

    let ship = app.ships[key];

    if (!ship.state)
      continue;

    if (ship.im){
      player.app = app;
      player.move(ship.state.p[0], ship.state.p[2], ship.state.a);

      player.render(ctx);
    } else {
      _ship.app = app;
      _ship.move(ship.state.p[0], ship.state.p[2]);

      _ship.render(ctx);
    }

  }
}