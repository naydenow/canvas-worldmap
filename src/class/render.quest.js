import Picture from './picture';

const target = new Picture(null, {x: 0, y: 0}, {url: 'assets/green_cross.png'}, false, false);
const hint = new Picture(null, {x: 0, y: 0}, {url: 'assets/q.png'}, false, false);

export default function (app, ctx) {
  for (let key in app.quests.quests) {

    let quest = app.quests.quests[key];

    quest.completion.forEach((c => {
      if (c.type !== 'point')
        return;

      target.text = quest.title;
      target.app = app;
      target.move(c.value[0], c.value[2]);
      target.render(ctx);

    }));


    if (quest.map_hint){
      hint.text = quest.title;
      hint.app = app;
      hint.move(quest.map_hint[0], quest.map_hint[2]);

      hint.render(ctx);
    }



/*    if (!ship.state)
      continue;

    player.app = app;
    player.move(ship.state.p[0], ship.state.p[2], ship.state.a);

    player.render(ctx);*/

  }
}