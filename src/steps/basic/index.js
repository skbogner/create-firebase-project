const write = require('write')

const indexFile = require('./files/index.js')
const onCreateFile = require('./files/onCreate.js')
const userFile = require('./files/user.js')
const babelFile = require('./files/babelrc.js')
const eslintFile = require('./files/eslintrc.js')
const eslintIgnoreFile = require('./files/eslintignore.js')

module.exports = function basicSetup () {
  const packageJson = {
    scripts: {
      'clean': 'rimraf ./build',
      'build': 'babel src --out-dir build --copy-files',
      'deploy': 'yarn clean && yarn build && firebase deploy'
    },
    dependencies: {
      'camelcase': '^4.1.0',
      'glob': '^7.1.2',
      'lodash': '^4.17.4'
    },
    devDependencies: {
      '@babel/cli': '^7.0.0-beta.37',
      '@babel/core': '^7.0.0-beta.37',
      '@babel/preset-env': '^7.0.0-beta.37',
      'eslint': '^4.15.0',
      'eslint-config-standard': '^11.0.0-beta.0',
      'eslint-plugin-import': '^2.8.0',
      'eslint-plugin-node': '^5.2.1',
      'eslint-plugin-promise': '^3.6.0',
      'eslint-plugin-standard': '^3.0.1',
      'rimraf': '^2.6.2'
    }
  }

  write.sync('./functions/index.js', indexFile)
  write.sync('./functions/src/firestore/users/onCreate.f.js', onCreateFile)
  write.sync('./functions/src/modules/user.js', userFile)
  write.sync('./functions/.babelrc', babelFile)
  write.sync('./functions/.eslintrc.js', eslintFile)
  write.sync('./functions/.eslintignore', eslintIgnoreFile)

  return [
    packageJson,
    `
To install dependencies run the following command:
  -> cd functions && yarn

The following scripts are available within the functions dir:
  - deploy
  - build
  - clean`
  ]
}
