import type { Author } from '#shared/interfaces/author'
import type { Fandom } from '#shared/interfaces/fandom'
import type { Tag } from '#shared/interfaces/tag'
import type { Warning } from '#shared/interfaces/warning'
import type { Fanfic } from '#shared/interfaces/fanfic'

export const useFanfics = () => {
  // Use useFetch for automatic caching and reactivity
  const { data: fandoms, error: _fandomsError } = useFetch<Fandom[]>('/api/fandoms', {
    default: () => []
  })

  const { data: tags, error: _tagsError } = useFetch<Tag[]>('/api/tags', {
    default: () => []
  })

  const { data: warnings, error: _warningsError } = useFetch<Warning[]>('/api/warnings', {
    default: () => []
  })

  const { data: authors, error: _authorsError } = useFetch<Author[]>('/api/authors', {
    default: () => []
  })

  const { data: fanfics, error: _fanficsError } = useFetch<Fanfic[]>('/api/fanfics', {
    default: () => []
  })

  // Search fanfics with dynamic query parameters
  const searchFanfics = async (query: {
    fandomIds?: number[]
    tagIds?: number[]
    searchText?: string
  }): Promise<Fanfic[]> => {
    const params = new URLSearchParams()

    if (query.fandomIds && query.fandomIds.length > 0) {
      query.fandomIds.forEach(id => params.append('fandomIds', id.toString()))
    }

    if (query.tagIds && query.tagIds.length > 0) {
      query.tagIds.forEach(id => params.append('tagIds', id.toString()))
    }

    if (query.searchText && query.searchText.trim()) {
      params.append('searchText', query.searchText.trim())
    }

    const queryString = params.toString()
    const data = await $fetch<Fanfic[]>(`/api/fanfics${queryString ? '?' + queryString : ''}`)
    return data || []
  }

  const getFanficById = async (id: number): Promise<Fanfic> => {
    return await $fetch(`/api/fanfics/${id}`)
  }

  // Legacy async methods for backward compatibility
  const getAllFandoms = async (): Promise<Fandom[]> => {
    return fandoms.value
  }

  const getAllTags = async (): Promise<Tag[]> => {
    return tags.value
  }

  const getAllWarnings = async (): Promise<Warning[]> => {
    return warnings.value
  }

  const getAllAuthors = async (): Promise<Author[]> => {
    return authors.value
  }

  const getAllFanfics = async (): Promise<Fanfic[]> => {
    return fanfics.value
  }

  return {
    // Async API methods
    getAllFandoms,
    getAllTags,
    getAllWarnings,
    getAllAuthors,
    searchFanfics,
    getFanficById,
    getAllFanfics,

    // Reactive data from useFetch (replaces manual caching)
    cachedFandoms: fandoms,
    cachedTags: tags,
    cachedWarnings: warnings,
    cachedFanfics: fanfics,

    // Legacy property for backward compatibility
    mockFanfics: fanfics
  }
}
