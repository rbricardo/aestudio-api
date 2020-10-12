import { Service } from 'typedi'
import { getCompanies, Company } from '../data/companies'
import { transformPaginate } from '../_helpers/utils/pagination'
interface Page {
  currentPage: number
  docs: Company
  lastPage: number
  totalPerPage: number
}

interface ICompanyWithMostLocations {
  name: string
  qty: number
}

@Service()
export default class CompaniesService {
  private async list(): Promise<Company[]> {
    return await getCompanies()
  }

  public async listPaginated(page: number): Promise<Page> {
    const companies = await this.list()
    return transformPaginate(page, companies)
  }

  public async getOldestCompany(): Promise<Company> {
    const companies = await this.list()
    if (!companies.length) {
      return null
    }

    const now = Date.now()
    const [oldest] = companies.sort(({ location_start_date: a }, { location_start_date: b }) => {
      return new Date(a || now).getTime() - new Date(b || now).getTime()
    })

    return oldest
  }

  public async getCompanyWithMostLocations(): Promise<ICompanyWithMostLocations> {
    const companies = await this.list()
    if (!companies.length) {
      return null
    }

    const counterByCompanies = new Map<string, number>()
    let companyWithMostLocationsSoFar = companies[0].business_name

    for (const company of companies) {
      const qty = (counterByCompanies.get(company.business_name) || 0) + 1

      counterByCompanies.set(company.business_name, qty)
      if (counterByCompanies.get(companyWithMostLocationsSoFar) < qty) {
        companyWithMostLocationsSoFar = company.business_name
      }
    }

    return { name: companyWithMostLocationsSoFar, qty: counterByCompanies.get(companyWithMostLocationsSoFar) }
  }
}
