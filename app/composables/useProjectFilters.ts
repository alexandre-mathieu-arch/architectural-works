import { useState } from '#app'

export const useProjectFilters = () => {
  const selectedTypology = useState<string | null>('filter-typology', () => null)
  const selectedSize = useState<string | null>('filter-size', () => null)
  const selectedYear = useState<string | null>('filter-year', () => null)
  const selectedCountry = useState<string | null>('filter-country', () => null)
  const selectedProjectTitle = useState<string | null>('filter-title', () => null)
  const sortBy = useState<string>('filter-sort', () => 'Date')

  const typologyOptions = useState<string[]>('opt-typology', () => [])
  const sizeOptions = useState<string[]>('opt-size', () => [])
  const yearOptions = useState<string[]>('opt-year', () => [])
  const countryOptions = useState<string[]>('opt-country', () => [])
  const projectTitleOptions = useState<string[]>('opt-titles', () => [])

  const resetFilters = () => {
    selectedTypology.value = null
    selectedSize.value = null
    selectedYear.value = null
    selectedCountry.value = null
    selectedProjectTitle.value = null
  }

  return {
    selectedTypology,
    selectedSize,
    selectedYear,
    selectedCountry,
    selectedProjectTitle,
    sortBy,
    typologyOptions,
    sizeOptions,
    yearOptions,
    countryOptions,
    projectTitleOptions,
    resetFilters
  }
}
