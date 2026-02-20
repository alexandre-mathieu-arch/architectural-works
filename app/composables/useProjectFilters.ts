import { useState } from '#app'

export const useProjectFilters = () => {
  const selectedTypology = useState<string | null>('filter-typology', () => null)
  const selectedSize = useState<string | null>('filter-size', () => null)
  const selectedYear = useState<string | null>('filter-year', () => null)
  const selectedCountry = useState<string | null>('filter-country', () => null)
  const sortBy = useState<string>('filter-sort', () => 'Nom')

  const typologyOptions = useState<string[]>('opt-typology', () => [])
  const sizeOptions = useState<string[]>('opt-size', () => [])
  const yearOptions = useState<string[]>('opt-year', () => [])
  const countryOptions = useState<string[]>('opt-country', () => [])

  const resetFilters = () => {
    selectedTypology.value = null
    selectedSize.value = null
    selectedYear.value = null
    selectedCountry.value = null
  }

  return {
    selectedTypology,
    selectedSize,
    selectedYear,
    selectedCountry,
    sortBy,
    typologyOptions,
    sizeOptions,
    yearOptions,
    countryOptions,
    resetFilters
  }
}
