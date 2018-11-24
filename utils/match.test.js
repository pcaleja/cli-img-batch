import match from './match'

it('returns an object', () => {
  expect(typeof match(1)).toBe('object');
})

it('returns an object with a function on', () => {
  expect(match(1)).toHaveProperty('on')
})

it('returns an object with a function otherwise', () => {
  expect(match(1)).toHaveProperty('otherwise')
})

it('runs on function when conditions are met', () => {
  let x = ''
  match(1).on(arg => arg === 1, () => x = 1)
  expect(x).toBe(1)
})

it('skips on function when conditions are not met', () => {
  let x = ''
  match(1).on(arg => arg !== 1, () => x = 1)
  expect(x).toBe('')
})

it('runs otherwise function when no on conditions are met', () => {
  let x = ''
  match(1)
    .on(arg => arg !== 1, () => x = 1)
    .on(arg => arg === 2, () => x = 2)
    .otherwise(() => x = 3)
  expect(x).toBe(3)
})
