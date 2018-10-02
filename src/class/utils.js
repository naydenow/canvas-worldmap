export const calcRegion = (region, length) => {
  let _r = region.split('=').map(function (r) {
    return +r;
  });

  let all = length ? length : 2;
  let res = [];
  let h   = all * -1;
  let i   = 0;

  while (h <= all) {
    let w = all * -1;

    while (w <= all) {
      res.push([_r[0] + w, _r[1] + h]);
      w++;
    }
    h++;
  }

  return res;
};

export const regionFromPosition = (x, y, CUBSTEP = 2000) => {
  let _x = CUBSTEP/2;
  let _y = _x;

  return ~~( ( (x > 0 ? _x : -_x) + x ) / CUBSTEP )+ "="+ ~~( ( (y > 0 ? _y : -_y) + y ) / CUBSTEP );
};