var Promise, Type, assert, fromArgs, git, type;

fromArgs = require("fromArgs");

Promise = require("Promise");

assert = require("assert");

Type = require("Type");

git = require("git-utils");

type = Type("GitRepository");

type.argumentTypes = {
  modulePath: String
};

type.defineFrozenValues({
  modulePath: fromArgs(0)
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
  getHead: function(branchName, options) {
    if (!Promise.isRejected(this._head)) {
      return this._head;
    }
    return this._head = git.getHead(this.modulePath, branchName, options);
  },
  hasBranch: function(branchName, options) {
    return git.hasBranch(this.modulePath, branchName, options);
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
  deleteBranch: function(branchName, options) {
    return git.deleteBranch(this.modulePath, branchName, options);
  },
  resetBranch: function(commit, options) {
    this._clean = null;
    return git.resetBranch(this.modulePath, commit, options);
  },
  addTag: function(tagName, options) {
    return git.addTag(this.modulePath, tagName, options);
  },
  deleteTag: function(tagName, options) {
    return git.deleteTag(this.modulePath, tagName, options);
  }
});

module.exports = type.build();

//# sourceMappingURL=map/Repository.map
