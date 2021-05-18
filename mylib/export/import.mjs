export const select = arr => Promise.all(arr.map(v=>import(`https://rpgen3.github.io/lib/mylib/export/${v}.mjs`))).then(v=>Object.assign({},...v));
export const all = async () => await select([
    'baseN',
    'css',
    'hankaku',
    'random',
    'save',
    'url',
    'useful'
]);
