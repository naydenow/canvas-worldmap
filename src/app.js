import Map from './class/map.js';

const _map = {
  areas:    [
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
  pictures: [
    {
      position: [1000, -4000],
      url:      'assets/ship.png'
    }
  ],
  quests:   [
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