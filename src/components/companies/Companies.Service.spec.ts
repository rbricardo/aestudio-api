import CompaniesService from './Companies.Service'
import * as nock from 'nock'

afterEach(() => {
  jest.restoreAllMocks()
  nock.cleanAll()
})

function buildServiceForResponse(response, responseCode = 200): [CompaniesService, { done: () => void }] {
  const scope = nock('https://data.lacity.org').get('/resource/6rrh-rzua.json').reply(responseCode, response)
  const service = new CompaniesService()
  return [service, scope]
}

describe('getOldestCompany()', () => {
  it('picks company with the oldest location_start_date', async () => {
    const [service, scope] = buildServiceForResponse([
      { business_name: 'A', location_start_date: '1971-03-01T00:00:00.000' },
      { business_name: 'B', location_start_date: '1943-08-09T00:00:00.000' },
      { business_name: 'C', location_start_date: '2009-05-01T00:00:00.000' },
    ])

    await expect(service.getOldestCompany()).resolves.toEqual({
      business_name: 'B',
      location_start_date: '1943-08-09T00:00:00.000',
    })
    scope.done()
  })

  it('picks company with the oldest location_start_date, deprioritising undefined location_start_date ', async () => {
    const [service, scope] = buildServiceForResponse([
      { business_name: 'A', location_start_date: '1971-08-09T00:00:00.000' },
      { business_name: 'B' },
      { business_name: 'C', location_start_date: '2009-05-01T00:00:00.000' },
    ])

    await expect(service.getOldestCompany()).resolves.toEqual({
      business_name: 'A',
      location_start_date: '1971-08-09T00:00:00.000',
    })
    scope.done()
  })

  it('picks the first company with the oldest location_start_date', async () => {
    const [service, scope] = buildServiceForResponse([
      { business_name: 'A', location_start_date: '2018-11-01T00:00:00.000' },
      { business_name: 'B', location_start_date: '2009-05-01T00:00:00.000' },
      { business_name: 'C', location_start_date: '2009-05-01T00:00:00.000' },
    ])
    await expect(service.getOldestCompany()).resolves.toEqual({
      business_name: 'B',
      location_start_date: '2009-05-01T00:00:00.000',
    })
    scope.done()
  })

  it('returns null if the list is empty', async () => {
    const [service, scope] = buildServiceForResponse([], 204)
    await expect(service.getOldestCompany()).resolves.toBeNull()
    scope.done()
  })
})

describe('getCompanyWithMostLocations()', () => {
  it('picks the company that appeared the most', async () => {
    const [service, scope] = buildServiceForResponse([
      { business_name: 'Company A' },
      { business_name: 'Company B' },
      { business_name: 'Company C' },
      { business_name: 'Company A' },
    ])
    await expect(service.getCompanyWithMostLocations()).resolves.toEqual({
      name: 'Company A',
      qty: 2,
    })
    scope.done()
  })

  it('picks the first company in case of draw', async () => {
    const [service, scope] = buildServiceForResponse([
      { business_name: 'Company B' },
      { business_name: 'Company B' },
      { business_name: 'Company B' },
      { business_name: 'Company A' },
      { business_name: 'Company A' },
      { business_name: 'Company A' },
      { business_name: 'Company C' },
    ])
    await expect(service.getCompanyWithMostLocations()).resolves.toEqual({
      name: 'Company B',
      qty: 3,
    })

    scope.done()
  })

  it('returns null if the list is empty', async () => {
    const [service, scope] = buildServiceForResponse([], 204)
    await expect(service.getCompanyWithMostLocations()).resolves.toBeNull()
    scope.done()
  })
})
