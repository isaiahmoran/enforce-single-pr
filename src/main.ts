import * as github from '@actions/github'
import {createPullRequestAPI} from './PullRequestsAPI'
import {Action} from './Action'

async function run() {
  let action = initializeAction()
  await action.perform()
}

function getToken(): string {
  return process.env.GITHUB_API_TOKEN ?? ""
}

function initializeAction(): Action {
  const git = github.getOctokit(getToken())
  let api = createPullRequestAPI(git, "whoopinc", "android")
  return new Action(api, "fuck")
}

run()