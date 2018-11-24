const promisify = (fn) => {
  return function promisified(...params) {
    return new Promise((resolve, reject) => {
      fn(...params.concat([
        (err, ...args) => err
          ? reject(err)
          : resolve( args.length < 2 ? args[0] : args )
      ]))
    })
  }
}

module.exports = promisify
