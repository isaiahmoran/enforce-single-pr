import {PullRequestAPI} from './PullRequestsAPI'

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