export const pushCommit = (path, branchName) => {
  require('simple-git')(`${path}`).push('origin', branchName);
};
