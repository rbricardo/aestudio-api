import { server } from '@tests/_config/server'

const companiesPath = '/companies'

describe('', () => {
  describe(`GET ${companiesPath}`, () => {
    it('should return status 200', async () => {
      const response = await server.get(`${companiesPath}/oldest`)
      const { status } = response
      expect(status).toBe(200)
    })
  })
})

describe('Should return the company with most locations', () => {
  describe(`GET ${companiesPath}`, () => {
    it('should return status 200', async () => {
      const response = await server.get(`${companiesPath}/mostLocations`)
      const { status } = response
      expect(status).toBe(200)
    })
  })
})
