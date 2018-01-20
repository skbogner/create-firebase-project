module.exports =
`/* globals jest describe it expect */
import user from './user'

/* Mocks */
console.log = jest.fn()

describe('user', () => {
  describe('created', () => {
    it('should be a function', () => {
      expect(typeof user.created).toBe('function')
    })

    it('should return a promise', () => {
      expect(user.created('input')).resolves.toEqual(true)
    })

    it('should log input', async () => {
      await user.created('input')
      expect(console.log).toBeCalledWith('input')
    })
  })
})
`
