import { Country } from "./country.inferface"
import { Region } from "./region.type"

export interface CacheStore {
  byCapital: TermCountries,
  byCountry: TermCountries,
  byRegion: RegionCountries
}

export interface TermCountries {
  term: string,
  countries: Country[]
}

export interface RegionCountries {
  region: Region,
  countries: Country[]
}

