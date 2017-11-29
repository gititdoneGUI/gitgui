const git = require('nodegit-kit');

module.exports = function commit(repo, message) {
  console.log('Will commit to', repo)
  return git.open(repo)
    .then(repo => git.commit(repo, {message}))
    .then(id => console.log('did commit to', repo, 'oid=', id));
}
