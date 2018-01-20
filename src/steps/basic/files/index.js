module.exports =
`const functions = require('firebase-functions');

const _ = require('lodash')
const glob = require('glob')
const camelCase = require('camelcase')

// import everything from everywhere in src
const files = glob.sync('./build/**/*.f.js', { cwd: __dirname, ignore: './node_modules/**' })

files.forEach(file => {
  const content = require(file)
  if (_.isFunction(content)) {
    const funcName = camelCase(file.slice(7,-5).split('/').join('_'))
    module.exports[funcName] = content
  } else if (_.isObject(content)) {
    _.keys(content).forEach(exp => {
      const funcName = camelCase(file.slice(7,-5).split('/').join('_') + '_' + exp)
      module.exports[funcName] = content[exp]
    })
  }
})
`
