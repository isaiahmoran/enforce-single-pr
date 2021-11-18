import * as github from '@actions/github';
import {createPullRequestAPI} from '../src/PullRequestsAPI'

// This test is currently intended to be manually run during development. To run:
// - Make sure you have an environment variable named GITHUB_TOKEN assigned to your token
// - Remove skip from the test below
describe('Integration Test', () => {

    it('Performs action', async () => {
        // const git = github.getOctokit(getToken())
        // let api = createPullRequestAPI(git, "whoopinc", "android")
        //
        // let pullRequests = await api.listPullRequests()
        // let filtered = pullRequests.filter((pr) => pr.user?.login == "WhoopMachineTranslations")
        // let toClose = filtered[1]
        //
        // // noinspection TypeScriptValidateJSTypes
        // api.createComment(toClose.number, "Doing cool stuff")
        //
        // api.closePullRequest(toClose.number)
        //
        // api.deletePullRequestBranch(toClose)
    })

    function getToken(): string {
        return process.env.GITHUB_API_TOKEN ?? ""
    }
})
