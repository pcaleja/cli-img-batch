const menus = {
  main: `
    img-batch-cli [command] <options>

    crop ............... crop images in a directory
    resize ............. resize images in a directory
    version ............ show package version
    help ............... show help menu for a command
  `,

  crop: `
    img-batch-cli crop <options>

    -w, --width ..... [int] width to crop
    -h, --height .... [int] height to crop
  `,

  resize: `
    img-batch-cli resize <option>

    -w, --width ........... [int] output defined width images
    -h, --height .......... [int] output defined height images
    -d, --divide .......... [bool] output 1x and 2x images
    -f, --favicon ......... [bool] output formatted images for favicon usage
    -b, --background ...... [bool] output formatted images for full width background usage
  `,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}
