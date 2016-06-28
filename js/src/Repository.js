var Promise, Type, assert, getArgProp, git, type;

getArgProp = require("getArgProp");

Promise = require("Promise");

assert = require("assert");

Type = require("Type");

git = require("git-utils");

type = Type("GitRepository");

type.argumentTypes = {
  modulePath: String
};

type.defineFrozenValues({
  modulePath: getArgProp("modulePath")
});

type.defineValues({
  _head: null,
  _branch: null,
  _clean: null,
  _staged: null
});

type.initInstance(function(modulePath) {
  return assert(git.isRepo(modulePath), "Invalid repository path!");
});

type.defineMethods({
  isClean: function() {
    if (!Promise.isRejected(this._clean)) {
      return this._clean;
    }
    return this._clean = git.isClean(this.modulePath);
  },
  isStaged: function() {
    if (!Promise.isRejected(this._staged)) {
      return this._staged;
    }
    return this._staged = git.isStaged(this.modulePath);
  },
  stageFiles: function(files) {
    this._staged = null;
    return git.stageFiles(this.modulePath, files);
  },
  commit: function(message) {
    this._staged = null;
    return git.commit(this.modulePath, message);
  },
  getHead: function(branchName, remoteName) {
    if (!Promise.isRejected(this._head)) {
      return this._head;
    }
    return this._head = git.getHead(this.modulePath, branchName, remoteName);
  },
  hasBranch: function(branchName, remoteName) {
    return git.hasBranch(this.modulePath, branchName, remoteName);
  },
  getBranch: function() {
    if (!Promise.isRejected(this._branch)) {
      return this._branch;
    }
    return this._branch = git.getBranch(this.modulePath);
  },
  getBranches: function(remoteName, options) {
    return git.getBranches(this.modulePath, remoteName, options);
  },
  setBranch: function(branchName, options) {
    return this._branch = git.setBranch(this.modulePath, branchName, options);
  },
  addBranch: function(branchName) {
    return this._branch = git.addBranch(this.modulePath, branchName);
  },
  pushBranch: function(remoteName, options) {
    return git.pushBranch(this.modulePath, remoteName, options);
  },
  deleteBranch: function(branchName, remoteName) {
    return git.deleteBranch(this.modulePath, branchName, remoteName);
  },
  resetBranch: function(commit, options) {
    this._clean = null;
    return git.resetBranch(this.modulePath, commit, options);
  },
  addTag: function(tagName, options) {
    return git.addTag(this.modulePath, tagName, options);
  },
  deleteTag: function(tagName, remoteName) {
    return git.deleteTag(this.modulePath, tagName, remoteName);
  }
});

module.exports = type.build();

//# sourceMappingURL=../../map/src/Repository.map
