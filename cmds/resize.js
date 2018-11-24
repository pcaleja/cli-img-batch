const error = require('../utils/error')
const match = require('../utils/match')
const shared = require('../utils/shared')

const handleImage = ({image, width, height, percentage, suffix}) => {
  const imageObj = shared.imageObj(image, suffix)

  imageObj.sharp
    .metadata()
    .then((metadata) => {
      if (percentage) {
        width = metadata.width * percentage
      }
      return imageObj.sharp
        .resize(width, height)
        .toFile(imageObj.output);
    })
}

const loopThroughImages = ({preset, width, height, images}) => {
  if (preset) {
    images.forEach(image => {
      presets[preset].forEach(p => {
        handleImage({
          width: p.width,
          height: p.height,
          suffix: p.suffix,
          percentage: p.percentage,
          image
        })
      })
    })
  } else {
    images.forEach(image => {
      handleImage({
        width,
        height,
        image
      })
    })
  }
}

const presets = {
  divide: [
    {percentage: 1, suffix: '@2x'},
    {percentage: 0.5}
  ],
  background: [
    {width: 2880, suffix: '@2x'},
    {width: 1984, suffix: 'sm-@2x'},
    {width: 1538, suffix: 'xs-@2x'},
    {width: 960, suffix: 'xxs-@2x'},
    {width: 650, suffix: 'xxs'},
    {width: 769, suffix: 'xs'},
    {width: 992, suffix: 'sm'},
    {width: 1440}
  ],
  favicon: [
    {width: 192, suffix: 'android-icon-192x192'},
    {width: 57, suffix: 'apple-icon-57x57'},
    {width: 60, suffix: 'apple-icon-60x60'},
    {width: 72, suffix: 'apple-icon-72x72'},
    {width: 76, suffix: 'apple-icon-76x76'},
    {width: 114, suffix: 'apple-icon-114x114'},
    {width: 120, suffix: 'apple-icon-120x120'},
    {width: 144, suffix: 'apple-icon-144x144'},
    {width: 152, suffix: 'apple-icon-152x152'},
    {width: 180, suffix: 'apple-icon-180x180'},
    {width: 16, suffix: 'favicon-16x16'},
    {width: 32, suffix: 'favicon-32x32'},
    {width: 96, suffix: 'favicon-96x96'}
  ]
}

const format = ({preset, width, height}) => {
  if (width && !Number.isInteger(width)) error('width must be an integer', true)
  if (height && !Number.isInteger(height)) error('height must be an integer', true)

  shared.checkOutputDir()
    .then(() => shared.getImages())
    .then((images) => {
      loopThroughImages({preset, width, height, images})
      console.log('resizing complete')
    })
}

const resize = (args) => {
  match(args)
    .on(args => Object.keys(args).length > 2, () => error('only one option is valid', true))
    .on(args => args.w || args.width, () => format({width: args.width || args.w}))
    .on(args => args.h || args.height, () => format({height: args.height || args.h}))
    .on(args => args.d || args.divide, () => format({preset: 'divide'}))
    .on(args => args.f || args.favicon, () => format({preset: 'favicon'}))
    .on(args => args.b || args.background, () => format({preset: 'background'}))
    .otherwise(() => error(`no valid options selected`, true))
}

module.exports = resize
