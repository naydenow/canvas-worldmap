import Picture from './picture';

const player = new Picture(null, {x: 0, y: 0}, {url: 'assets/ship.png'});

export default function (app, ctx) {
  // console.log(app.ships)
  for (let key in app.ships) {

    let ship = app.ships[key];

    if (!ship.state)
      continue;

    player.app = app;
    player.move(ship.state.p[0], ship.state.p[2], ship.state.a);

    player.render(ctx);

  }
}