import * as github from '@actions/github';

// This test is currently intended to be manually run during development. To run:
// - Make sure you have an environment variable named GITHUB_TOKEN assigned to your token
// - Remove skip from the test below
describe('Integration Test', () => {

    it('Performs action', async () => {
        const git = github.getOctokit(getToken())
        let response = await git.rest.pulls.list({
            owner: "whoopinc",
            repo: "android"
        })
        let pullRequests = response.data
        let filtered = pullRequests.filter((pr) => pr.user?.login == "WhoopMachineTranslations")
        let toClose = filtered[1]

        // noinspection TypeScriptValidateJSTypes
        await git.rest.issues.createComment({
            owner: "whoopinc",
            repo: "android",
            issue_number: toClose.number,
            body: "We are all up in your PR"
        })

        await git.rest.pulls.update({
            owner: "whoopinc",
            repo: "android",
            pull_number: toClose.number,
            state: "closed"
        })
    })

    function getToken(): string {
        return process.env.GITHUB_API_TOKEN ?? ""
    }
})
