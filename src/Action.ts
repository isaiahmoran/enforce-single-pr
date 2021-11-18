import {createPullRequestAPI, PullRequestAPI} from './PullRequestsAPI'
import * as github from '@actions/github'
import * as core from '@actions/core'

export class Action {
  constructor(private api: PullRequestAPI, private userName: string) {}

  async perform() {
    let pullRequests = await this.api.listPullRequests()
    let filtered = pullRequests.filter((pr) => pr.user?.login == this.userName)

    if (filtered.length > 1){
      let newest = filtered[0].head.ref
      filtered.splice(0, 1)
      for (let i = 0; i < filtered.length; i++){
        this.api.createComment(filtered[i].number, `Closing PR as a newer one from ${this.userName} exists at ${newest}`)
        this.api.closePullRequest(filtered[i].number)
        this.api.deletePullRequestBranch(filtered[i])
      }
    }
  }
}

export function createAction(): Action {
  let token = core.getInput("token")
  const git = github.getOctokit(token)
  let owner = core.getInput("owner")
  let repo = core.getInput("repo")
  let username = core.getInput("username")
  let api = createPullRequestAPI(git, owner, repo)
  return new Action(api, username)
}