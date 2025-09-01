import { mockLibraries } from '../../data/mockData'

export default defineEventHandler(async (event) => {
  const libraryId = getRouterParam(event, 'id')

  if (!libraryId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Library ID is required'
    })
  }

  const id = Number(libraryId)
  const library = mockLibraries.find(l => l.id === id)

  if (!library) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Library not found'
    })
  }

  return library
})
