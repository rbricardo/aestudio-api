import { Router } from 'express'
import { Container } from 'typedi'

import CompaniesController from './Companies.Controller'
import CompaniesValidator from './Companies.Validator'

const companiesValidator = Container.get(CompaniesValidator)
const companiesController = Container.get(CompaniesController)

export default (app: Router): void => {
  const API = Router()

  API.get('/', companiesValidator.list(), companiesController.list)
  API.get('/oldest', companiesController.getOldestCompany)
  API.get('/mostLocations', companiesController.getMostLocations)

  app.use('/companies', API)
}
