const fs = require('fs')
const del = require('del')
const sharp = require('sharp')
const config = require('./config')
const promisify = require('./promisify')
const error = require('./error')

const readdirAsync = promisify(fs.readdir)
const mkdirAsync = promisify(fs.mkdir)

const shared = {
  checkOutputDir () {
    const outputDir = config.directory + config.outputDirectory
    return readdirAsync(outputDir)
      .then(() => del([outputDir + '/*']))
      .catch(() => mkdirAsync(outputDir))
  },

  getImages () {
    return readdirAsync(config.directory)
      .then(files => {
        const images = files.filter(val => {
          const ext = val.toLowerCase().split('.')[1]
          return ['png', 'jpg', 'jpeg'].indexOf(ext) > -1
        })

        if (!images.length) {
          return error('no images found')
        }

        return images
      })
  },

  imageObj (image, suffix) {
    if (!image) return error('image is required')
    const imageArray = image.split('.')
    const imageName = imageArray[0]
    const imageExt = `.${imageArray[1]}`
    const imageSuffix = suffix ? `-${suffix}` : ''
    const dir = config.directory + config.outputDirectory
    const imageFile = imageName + imageSuffix + imageExt
    return {
      sharp: sharp(`${config.directory}/${image}`),
      output: `${dir}/${imageFile}`
    }
  }
}

module.exports = shared
