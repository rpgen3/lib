const _r = max => Math.floor(Math.random()*max);
export const randInt = (min, max) => _r(Math.abs(max - min + 1)) + min;
export const randArr = arr => arr[_r(arr.length)];
export const shuffle = arr => {
    let m = arr.length;
    while (m) {
        const i = _r(m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
};
