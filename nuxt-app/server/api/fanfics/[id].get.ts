import { mockFanfics } from '../../data/mockData'

export default defineEventHandler(async (event) => {

  // Get the fanfic ID from the route parameter
  const fanficId = getRouterParam(event, 'id')

  if (!fanficId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Fanfic ID is required'
    })
  }

  const id = Number(fanficId)
  const fanfic = mockFanfics.find(f => f.id === id)

  if (!fanfic) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Fanfic not found'
    })
  }

  return fanfic
})
