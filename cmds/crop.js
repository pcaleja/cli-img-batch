const error = require('../utils/error')
const match = require('../utils/match')
const shared = require('../utils/shared')

const handleImage = ({image, width, height, suffix}) => {
  const imageObj = shared.imageObj(image, suffix)

  imageObj.sharp
    .resize({
      width,
      height
    })
    .toFile(imageObj.output)
}

const loopThroughImages = ({width, height, images}) => {
  images.forEach(image => {
    handleImage({
      width,
      height,
      image
    })
  })
}

const format = ({width, height}) => {
  if (width && !Number.isInteger(width)) error('width must be an integer', true)
  if (height && !Number.isInteger(height)) error('height must be an integer', true)

  shared.checkOutputDir()
    .then(() => shared.getImages())
    .then((images) => {
      loopThroughImages({width, height, images})
      console.log('cropping complete')
    })
}

const crop = (args) => {
  const width = args.w || args.width
  const height = args.h || args.height
  match(args)
    .on(() => height || width, () => {
      return format({width, height })
    })
    .otherwise(() => error(`no valid options selected`, true))
}

module.exports = crop
