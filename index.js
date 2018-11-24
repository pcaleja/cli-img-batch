const minimist = require('minimist')
const error = require('./utils/error')
const match = require('./utils/match')

module.exports = () => {
  const args = minimist(process.argv.slice(2))

  let cmd = args._[0] || 'help'

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || typeof args.h === typeof true) {
    cmd = 'help'
  }

  match(cmd)
    .on(cmd => cmd === 'help', () => require('./cmds/help')(args))
    .on(cmd => cmd === 'version', () => require('./cmds/version')(args))
    .on(cmd => cmd === 'resize', () => require('./cmds/resize')(args))
    .on(cmd => cmd === 'crop', () => require('./cmds/crop')(args))
    .otherwise(cmd => error(`"${cmd}" is not a valid command!`, true))
}
