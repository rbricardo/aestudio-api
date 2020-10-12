import { Router } from 'express'
import HealthCheck from '@components/health-check'
import CompaniesAPI from '@components/companies'

export default (app: Router): void => {
  HealthCheck(app)
  CompaniesAPI(app)
}
