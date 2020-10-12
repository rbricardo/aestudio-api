import axios from 'axios'

export const getCompanies = async (): Promise<any> => {
  try {
    const { data } = await axios.get('https://data.lacity.org/resource/6rrh-rzua.json')
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}