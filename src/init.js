const write = require('write')
const jsonfile = require('jsonfile')

const indexFile = require('./files/index.js')
const onCreateFile = require('./files/onCreate.js')
const babelFile = require('./files/babel.js')
const eslintFile = require('./files/eslint.js')
const eslintIgnoreFile = require('./files/eslintignore.js')

module.exports = opts => {
  const package = jsonfile.readFileSync('./functions/package.json')

  // 1. Files
  // redo functions/index.js
  write.sync('./functions/index.js', indexFile)
  
  // add requirements to package.json
  package.dependencies['camelcase'] = '^4.1.0'
  package.dependencies['glob'] = '^7.1.2'
  package.dependencies['lodash'] = '^4.17.4'
  
  // create example function
  write.sync('./functions/src/firestore/users/onCreate.f.js', onCreateFile)
  
  // create README.md
  
  
  // 2. Babel & ESLint
  // add .babelrc
  write.sync('./functions/.babelrc', babelFile)
  // add .eslintrc and .eslintignore
  write.sync('./functions/.eslintrc.js', eslintFile)
  write.sync('./functions/.eslintignore', eslintIgnoreFile)
  
  // add to package.json
  package.devDependencies = {
    "@babel/cli": "^7.0.0-beta.37",
    "@babel/core": "^7.0.0-beta.37",
    "@babel/preset-env": "^7.0.0-beta.37",
    "eslint": "^4.15.0",
    "eslint-config-standard": "^11.0.0-beta.0",
    "eslint-plugin-import": "^2.8.0",
    "eslint-plugin-node": "^5.2.1",
    "eslint-plugin-promise": "^3.6.0",
    "eslint-plugin-standard": "^3.0.1"
  }
  
  // 4. Add scripts
  // cleanup, build, deploy
  package.scripts = {
    'clean': 'rimraf ./build',
    'build': 'babel src --out-dir build --copy-files',
    'deploy': 'yarn clean && yarn build && firebase deploy'
  }
  // and their dependencies
  package.devDependencies['rimraf'] = '^2.6.2'
  
  // 4. Install dependencies
  jsonfile.writeFileSync('./functions/package.json', package, {
    spaces: 2
  })
  console.log(`To instal dependencies run the following command:
  -> cd functions && yarn
`
  )
}