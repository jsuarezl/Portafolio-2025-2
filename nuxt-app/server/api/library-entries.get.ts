import { mockLibraryEntries } from '../data/mockData'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { libraryId } = query

  let results = [...mockLibraryEntries]

  // Filter by library ID if provided
  if (libraryId) {
    const libraryIdNum = Number(libraryId)
    results = results.filter(entry => entry.library_id === libraryIdNum)
  }

  return results
})
