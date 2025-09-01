import type { Library } from '#shared/interfaces/library'
import type { LibraryEntry } from '#shared/interfaces/libraryEntry'

export const useLibraries = () => {
  // Use useFetch for automatic caching and reactivity
  const { data: libraries, error: _librariesError } = useFetch<Library[]>('/api/libraries', {
    default: () => []
  })

  // Get all libraries (optionally filtered)
  const getAllLibraries = async (filters?: {
    userId?: number
    published?: boolean
  }): Promise<Library[]> => {
    const params = new URLSearchParams()

    if (filters?.userId) {
      params.append('userId', filters.userId.toString())
    }

    if (filters?.published !== undefined) {
      params.append('published', filters.published.toString())
    }

    const queryString = params.toString()
    const data = await $fetch<Library[]>(`/api/libraries${queryString ? '?' + queryString : ''}`)
    return data || []
  }

  // Get library by ID
  const getLibraryById = async (id: number): Promise<Library> => {
    return await $fetch(`/api/libraries/${id}`)
  }

  // Get library entries
  const getLibraryEntries = async (libraryId: number): Promise<LibraryEntry[]> => {
    return await $fetch(`/api/libraries/${libraryId}/entries`)
  }

  // Get user's libraries
  const getUserLibraries = async (userId: number, publishedOnly = false): Promise<Library[]> => {
    return await getAllLibraries({ userId, published: publishedOnly ? true : undefined })
  }

  // Get published libraries
  const getPublishedLibraries = async (): Promise<Library[]> => {
    return await getAllLibraries({ published: true })
  }

  // Get all library entries (optionally filtered by library ID)
  const getAllLibraryEntries = async (libraryId?: number): Promise<LibraryEntry[]> => {
    const params = new URLSearchParams()

    if (libraryId) {
      params.append('libraryId', libraryId.toString())
    }

    const queryString = params.toString()
    const data = await $fetch<LibraryEntry[]>(`/api/library-entries${queryString ? '?' + queryString : ''}`)
    return data || []
  }

  // Helper function to get effective summary (custom or fallback to fanfic summary)
  const getEffectiveSummary = (entry: LibraryEntry): string => {
    return entry.summary || entry.fanfic.summary
  }

  // Helper function to get combined tags (fanfic tags + additional tags)
  const getCombinedTags = (entry: LibraryEntry) => {
    return [...entry.fanfic.tags, ...entry.additionalTags]
  }

  return {
    // Async API methods
    getAllLibraries,
    getLibraryById,
    getLibraryEntries,
    getAllLibraryEntries,
    getUserLibraries,
    getPublishedLibraries,

    // Helper methods
    getEffectiveSummary,
    getCombinedTags,

    // Reactive data from useFetch
    cachedLibraries: libraries
  }
}
