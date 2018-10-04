import Map from './class/map.js';

const _map = {
  areas:     [
    {
      name:     "Базовый магазин",
      position: [-17984, 0, 18683, 2000],
      color:    '#bc743c45'
    },
    {
      name:     "Базовый магазин",
      position: [-0, 0, 0, 2000],
      color:    '#bc243c45'
    }
  ],
  teleports: [
    {
      name:     "Телепорт в ад",
      position: [0, 0],
      url:      'assets/teleport.png'
    }
  ]
  ,
  pictures:  [],
  quests:    [
    {
      position: [-1500, -4500],
      url:      'assets/cross.png',
      name:     "Имя точки",
    },
    {
      position: [4000, -4000],
      url:      'assets/point.png',
      name:     "Имя другой точки",
    }
  ]

};

window.map = new Map('world-map', _map);

let s = {
  "BOT-11AB5":    {
    name:  'Вася',
    state: {
      a: 15,
      p: [2000, 0, 0]
    }
  }, "BOT-12AB5": {
    name:  'Вася2',
    state: {
      a: 15,
      p: [1000, 0, 1000]
    }
  }, "BOT-13AB5": {
    name:  'Вася3'
  }
}

map.setShips(s)

setInterval(() => {
  var time = Date.now() * 0.0005;

  for (let k in s) {
    s[k].state && (s[k].state.p[2]+=  Math.sin( time * 0.7 ) * 20);
  }

  s["BOT-11AB5"].state.a +=  Math.sin( time * 0.7 ) * 5;
  s["BOT-12AB5"].state.a +=  Math.cos( time * 0.7 ) * 5;
},1000/60)