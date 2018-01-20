const write = require('write')

const userSpecFile = require('./files/user-spec.js')

module.exports = function basicSetup (prevPkg) {
  const packageJson = {
    scripts: {
      'build': {
        type: 'APPEND',
        script: '--ignore **.spec.js,**.test.js,**/__mocks__'
      },
      'test': 'jest'
    },
    dependencies: {},
    devDependencies: {
      'jest': '^22.1.1',
      'babel-7-jest': '^21.3.3'
    },
    jest: {
      transform: {
        '.js$': 'babel-7-jest'
      }
    }
  }

  write.sync('./functions/src/modules/user.spec.js', userSpecFile)

  return [
    packageJson,
    `  - test`]
}
