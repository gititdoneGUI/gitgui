var nodegit = require('../'),
  path = require('path');

// This code walks the history of the master branch and prints results
// that look very similar to calling `git log` from the command line

nodegit.Repository.open(path.resolve(__dirname, '../.git'))
  .then(function(repo) {
    return repo.getMasterCommit();
  })
  .then(function(firstCommitOnMaster){
    // History returns an event.
    var history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.Time);

    // History emits "commit" event for each commit in the branch's history
    history.on('commit', function(commit) {
      console.log('commit ' + commit.sha());
      console.log('Author:', commit.author().name() +
        ' <' + commit.author().email() + '>');
      console.log('Date:', commit.date());
      console.log('\n    ' + commit.message());
    });

    // Don't forget to call `start()`!
    history.start();
  })
  .done();

  var nodegit = require("../");
  var path = require("path");
  var promisify = require("promisify-node");
  var fse = promisify(require("fs-extra"));
  var fileName = "newfile.txt";
  var fileContent = "hello world";
  var directoryName = "salad/toast/strangerinastrangeland/theresnowaythisexists";
  // ensureDir is an alias to mkdirp, which has the callback with a weird name
  // and in the 3rd position of 4 (the 4th being used for recursion). We have to
  // force promisify it, because promisify-node won't detect it on its
  // own and assumes sync
  fse.ensureDir = promisify(fse.ensureDir);
  
  /**
   * This example creates a certain file `newfile.txt`, adds it to the git
   * index and commits it to head. Similar to a `git add newfile.txt`
   * followed by a `git commit`
  **/
  
  var repo;
  var index;
  var oid;
  
  nodegit.Repository.open(path.resolve(__dirname, "../.git"))
  .then(function(repoResult) {
    repo = repoResult;
    return fse.ensureDir(path.join(repo.workdir(), directoryName));
  }).then(function(){
    return fse.writeFile(path.join(repo.workdir(), fileName), fileContent);
  })
  .then(function() {
    return fse.writeFile(
      path.join(repo.workdir(), directoryName, fileName),
      fileContent
    );
  })
  .then(function() {
    return repo.refreshIndex();
  })
  .then(function(indexResult) {
    index = indexResult;
  })
  .then(function() {
    // this file is in the root of the directory and doesn't need a full path
    return index.addByPath(fileName);
  })
  .then(function() {
    // this file is in a subdirectory and can use a relative path
    return index.addByPath(path.join(directoryName, fileName));
  })
  .then(function() {
    // this will write both files to the index
    return index.write();
  })
  .then(function() {
    return index.writeTree();
  })
  .then(function(oidResult) {
    oid = oidResult;
    return nodegit.Reference.nameToId(repo, "HEAD");
  })
  .then(function(head) {
    return repo.getCommit(head);
  })
  .then(function(parent) {
    var author = nodegit.Signature.create("Scott Chacon",
      "schacon@gmail.com", 123456789, 60);
    var committer = nodegit.Signature.create("Scott A Chacon",
      "scott@github.com", 987654321, 90);
  
    return repo.createCommit("HEAD", author, committer, "message", oid, [parent]);
  })
  .done(function(commitId) {
    console.log("New Commit: ", commitId);
  });


  //with nodegit
  git.open('../repo-path/new/or/existing')
  .then(function(repo){
      // git commit -am"a new commit"
      return git.commit(repo, {
          'message': 'a new commit'
      })
      .then(function(oid){
          console.log(oid);
      });
  });