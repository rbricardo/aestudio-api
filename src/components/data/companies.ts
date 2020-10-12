import axios from 'axios'

export interface Company {
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

export const getCompanies = async (): Promise<any> => {
  try {
    const { data } = await axios.get('https://data.lacity.org/resource/6rrh-rzua.json')
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}