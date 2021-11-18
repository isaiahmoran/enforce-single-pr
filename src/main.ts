import {createAction} from './Action'

async function run() {
  let action = createAction()
  await action.perform()
}

run()