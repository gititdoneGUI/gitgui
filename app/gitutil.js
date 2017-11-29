// const {dirname, join, resolve} = require('path')
//     , {exists: existsAsync} = require('fs')

// const exists = path =>
//   new Promise((resolve, reject) =>
//     existsAsync(path, (ok, fail) => fail ? reject(fail) : resolve(ok)))

// module.exports = {gitRoot}

// function gitRoot(path) {
//   return exists(resolve(join(path, '.git')))
//     .then(doesExist => {
//       if (doesExist) return resolve(path);
//       if (path === '/') return null;
//       return gitRoot(dirname(path));
//     })
// }

// if (module === require.main)
//   gitRoot(process.argv[2]).then(console.log);
