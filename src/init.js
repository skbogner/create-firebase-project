const jsonfile = require('jsonfile')
const _ = require('lodash')

// Steps
const stepBasicSetup = require('./steps/basic')
const stepJest = require('./steps/jest')

// Helpers
const mergeScripts = (prev, next) => {
  _.forEach(_.keys(next), script => {
    if (_.includes(_.keys(prev), script)) {
      if (!_.isObject(next[script])) {
        console.log(script, '\t! possibly conflicting script')
        return
      }

      if (next[script].type === 'APPEND') {
        console.log(script, '\t\u2713 appending to script')
        next[script] = prev[script] + next[script].script
      }
    }
  })

  return next
}

const runSteps = (packageJson, logStatements, steps) => {
  steps.forEach(step => {
    [packageJson, logStatements] = runStep(packageJson, logStatements, step)
  })
  return [packageJson, logStatements]
}

const runStep = (prevPackageJson, logStatements, step) => {
  const [packageJson, log] = step()
  const merged = mergeScripts(
    prevPackageJson.scripts,
    packageJson.scripts
  )

  return [
    _.merge(prevPackageJson, _.omit(packageJson, 'scripts'), { scripts: merged }),
    [...logStatements, log]
  ]
}

module.exports = opts => {
  let [packageJson, logs] = runSteps(
    jsonfile.readFileSync('./functions/package.json'),
    [],
    [
      stepBasicSetup,
      stepJest
    ]
  )

  // Write package.json
  jsonfile.writeFileSync('./functions/package.json', packageJson, {
    spaces: 2
  })

  // Write log
  _.forEach(logs, l => console.log(l))
}
