import { Service } from 'typedi'
import { getCompanies } from '../data/companies'
import { transformPaginate } from '../_helpers/utils/pagination'
// eslint-disable-next-line @typescript-eslint/no-var-requires

interface Company {
  business_name: string
  city: string
  location_1: {
    latitude: string
    longitude: string
  }
  location_account: string
  location_description: string
  location_start_date: string
  naics: string
  primary_naics_description: string
  street_address: string
  zip_code: string
}
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

    const [oldest] = companies.sort(({ location_start_date: a }, { location_start_date: b }) => {
      return new Date(a).getTime() - new Date(b).getTime()
    })
    console.log(oldest, 'oldest')
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
