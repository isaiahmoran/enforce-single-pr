import * as github from '@actions/github';
import {createPullRequestAPI} from '../src/PullRequestsAPI'

// This test is currently intended to be manually run during development. To run:
// - Make sure you have an environment variable named GITHUB_TOKEN assigned to your token
// - Remove skip from the test below
describe('Integration Test', () => {

    it('Performs action', async () => {
        // Write some tests here.
    })

    function getToken(): string {
        return process.env.GITHUB_API_TOKEN ?? ""
    }
})
