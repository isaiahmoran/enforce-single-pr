import {GitHub} from '@actions/github/lib/utils'

export type GithubUser = {
  login: string
}

export type Head = {
  ref: string
}

export type PullRequest = {
  head: Head
  id: number
  number: number
  title: String
  user: GithubUser | null
}

export interface PullRequestAPI {
  listPullRequests(): Promise<PullRequest[]>

  createComment(issue_number: number, body: string): void

  closePullRequest(issue_number: number): void

  deletePullRequestBranch(pullRequest: PullRequest): void
}

class GithubPullRequestAPI implements PullRequestAPI {
  constructor(private git: InstanceType<typeof GitHub>,
              private owner: string,
              private repo: string) {
  }


  async listPullRequests(): Promise<PullRequest[]> {
    let response = await this.git.rest.pulls.list({
      owner: this.owner,
      repo: this.repo
    })

    return response.data
  }

  async closePullRequest(issue_number: number) {
    await this.git.rest.issues.update({
      owner: this.owner,
      repo: this.repo,
      issue_number: issue_number,
      state: 'closed'
    })
  }

  async createComment(issue_number: number, body: string): Promise<void> {
    await this.git.rest.issues.createComment({
      owner: this.owner,
      repo: this.repo,
      issue_number: issue_number,
      body: body
    })
  }

  async deletePullRequestBranch(pullRequest: PullRequest) {
    await this.git.rest.git.deleteRef({
      owner: this.owner,
      repo: this.repo,
      ref: `heads/${pullRequest.head.ref}`
    })
  }
}

export function createPullRequestAPI(git: InstanceType<typeof GitHub>,
                                     owner: string,
                                     repo: string): PullRequestAPI {
  return new GithubPullRequestAPI(git, owner, repo)
}