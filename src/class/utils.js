const CUBSTEP = 2000;


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

export const regionFromPosition = (x, z) => {
  let _x = _z = CUBSTEP / 2;
  if (x < 0) {
    _x = -_x;
  }
  if (z < 0) {
    _z = -_z;
  }


  let x = ~~(((_x + x) / CUBSTEP));
  let z = ~~(((_z + z) / CUBSTEP));

  return x + '=' + z;
};