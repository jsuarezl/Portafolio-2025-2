import { mockLibraryEntries } from '../../../data/mockData'

export default defineEventHandler(async (event) => {
  const libraryId = getRouterParam(event, 'id')

  if (!libraryId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Library ID is required'
    })
  }

  const id = Number(libraryId)

  // Filter entries by library ID and sort by ordering
  const entries = mockLibraryEntries
    .filter(entry => entry.library_id === id)
    .sort((a, b) => a.ordering - b.ordering)

  return entries
})
