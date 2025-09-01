import { mockLibraries } from '../data/mockData'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { userId, published } = query

  let results = [...mockLibraries]

  // Filter by user ID if provided
  if (userId) {
    const userIdNum = Number(userId)
    results = results.filter(library => library.user_id === userIdNum)
  }

  // Filter by published status if provided
  if (published !== undefined) {
    const isPublished = published === 'true'
    results = results.filter(library => library.published === isPublished)
  }

  return results
})
