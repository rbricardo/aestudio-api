import { Request, Response, NextFunction } from 'express'
import Container, { Service } from 'typedi'
import CompaniesService from './Companies.Service'
import * as httpStatus from 'http-status'

const companiesService = Container.get(CompaniesService)

@Service()
export default class UsersController {
  public async list(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const page = request.query.page as string || '1'

      const companies = await companiesService.listPaginated(parseInt(page))
      return response.status(200).json(companies)
    } catch (err) {
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }

  public async getOldestCompany(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const oldestCompany = await companiesService.getOldestCompany()
      return response.status(200).json(oldestCompany)
    } catch (err) {
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }

  public async getMostLocations(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const mostLocationsCompany = await companiesService.getCompanyWithMostLocations()
      return response.status(200).json(mostLocationsCompany)
    } catch (err) {
      return next({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err })
    }
  }
}
