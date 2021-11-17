import {PullRequestAPI} from './PullRequestsAPI'

export class Action {
  constructor(private api: PullRequestAPI, private userName: string) {
  }

  async perform() {
    // do the thing
  }
}