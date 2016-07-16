
fromArgs = require "fromArgs"
Promise = require "Promise"
assert = require "assert"
Type = require "Type"
git = require "git-utils"

type = Type "GitRepository"

type.argumentTypes =
  modulePath: String

type.defineFrozenValues

  modulePath: fromArgs 0

type.defineValues

  _head: null

  _branch: null

  _clean: null

  _staged: null

type.initInstance (modulePath) ->
  assert git.isRepo(modulePath), "Invalid repository path!"

type.defineMethods

  isClean: ->
    return @_clean if not Promise.isRejected @_clean
    @_clean = git.isClean @modulePath

  isStaged: ->
    return @_staged if not Promise.isRejected @_staged
    @_staged = git.isStaged @modulePath

  stageFiles: (files) ->
    @_staged = null
    git.stageFiles @modulePath, files

  commit: (message) ->
    @_staged = null
    git.commit @modulePath, message

  getHead: (branchName, options) ->
    return @_head if not Promise.isRejected @_head
    @_head = git.getHead @modulePath, branchName, options

  hasBranch: (branchName, options) ->
    git.hasBranch @modulePath, branchName, options

  getBranch: ->
    return @_branch if not Promise.isRejected @_branch
    @_branch = git.getBranch @modulePath

  getBranches: (remoteName, options) ->
    git.getBranches @modulePath, remoteName, options

  setBranch: (branchName, options) ->
    @_branch = git.setBranch @modulePath, branchName, options

  addBranch: (branchName) ->
    @_branch = git.addBranch @modulePath, branchName

  pushBranch: (remoteName, options) ->
    git.pushBranch @modulePath, remoteName, options

  deleteBranch: (branchName, options) ->
    git.deleteBranch @modulePath, branchName, options

  resetBranch: (commit, options) ->
    @_clean = null
    git.resetBranch @modulePath, commit, options

  addTag: (tagName, options) ->
    git.addTag @modulePath, tagName, options

  deleteTag: (tagName, options) ->
    git.deleteTag @modulePath, tagName, options

# TODO: Add the other methods...

module.exports = type.build()
