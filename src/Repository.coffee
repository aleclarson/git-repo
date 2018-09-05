# TODO: Add missing methods
assertValid = require "assertValid"

git = {}

class GitRepository
  constructor: (@path) ->
    assertValid @path, "string"
    @_head = null
    @_branch = null
    @_clean = null
    @_staged = null

  isClean: ->
    git.isClean or= require "git-utils/lib/isClean"
    @_clean or= git.isClean @path

  isStaged: ->
    git.isStaged or= require "git-utils/lib/isStaged"
    @_staged or= git.isStaged @path

  stageFiles: (files) ->
    @_staged = null
    git.stageFiles or= require "git-utils/lib/stageFiles"
    git.stageFiles @path, files

  commit: (message) ->
    @_clean = @_staged = null
    git.commit or= require "git-utils/lib/commit"
    git.commit @path, message

  getHead: (branch, opts) ->
    git.getHead or= require "git-utils/lib/getHead"
    @_head or= git.getHead @path, branch, opts

  hasBranch: (branch, opts) ->
    git.hasBranch or= require "git-utils/lib/hasBranch"
    git.hasBranch @path, branch, opts

  getBranch: ->
    git.getBranch or= require "git-utils/lib/getBranch"
    @_branch or= git.getBranch @path

  getBranches: (remote, opts) ->
    git.getBranches or= require "git-utils/lib/getBranches"
    git.getBranches @path, remote, opts

  setBranch: (branch, opts) ->
    git.setBranch or= require "git-utils/lib/setBranch"
    @_branch = git.setBranch @path, branch, opts

  addBranch: (branch) ->
    git.addBranch or= require "git-utils/lib/addBranch"
    await git.addBranch @path, branch
    @_branch = Promise.resolve branch
    return

  pushBranch: (opts) ->
    git.pushBranch or= require "git-utils/lib/pushBranch"
    git.pushBranch @path, opts

  deleteBranch: (branch, opts) ->
    git.deleteBranch or= require "git-utils/lib/deleteBranch"
    git.deleteBranch @path, branch, opts

  resetBranch: (commit, opts) ->
    @_clean = null
    git.resetBranch or= require "git-utils/lib/resetBranch"
    git.resetBranch @path, commit, opts

  addTag: (tag, opts) ->
    git.addTag or= require "git-utils/lib/addTag"
    git.addTag @path, tag, opts

  deleteTag: (tag, opts) ->
    git.deleteTag or= require "git-utils/lib/deleteTag"
    git.deleteTag @path, tag, opts

module.exports = GitRepository
