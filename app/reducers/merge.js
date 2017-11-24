export const merge = (path, options) => {
  require('simple-git')(`${path}`).merge(options);
};

export const mergeFromTo = (path, from, to) => {
  require('simple-git')(`${path}`).mergeFromTo(from, to);    
};
