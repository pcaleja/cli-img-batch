import shared from './shared'

describe('imageObj', () => {
  it('returns an object', () => {
    expect(typeof shared.imageObj('abc.jpg', '@2x')).toBe('object')
  })

  it('returns the output directory with a suffix', () => {
    expect(shared.imageObj('abc.jpg', '@2x').output).toBe(`${process.cwd()}/_output/abc-@2x.jpg`)
  })

  it('returns an error when image is not defined', () => {
    expect(shared.imageObj()).toBeUndefined()
  })
})
