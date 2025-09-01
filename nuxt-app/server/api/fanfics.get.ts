import { mockFanfics } from '../data/mockData'

export default defineEventHandler(async (event) => {

  // Get query parameters for filtering
  const query = getQuery(event)
  const { fandomIds, tagIds, searchText } = query

  let results = [...mockFanfics]

  // Filter by fandoms
  if (fandomIds) {
    const fandomIdArray = Array.isArray(fandomIds) ? fandomIds.map(Number) : [Number(fandomIds)]
    results = results.filter(fanfic =>
      fanfic.fandoms.some(fandom => fandomIdArray.includes(fandom.id))
    )
  }

  // Filter by tags
  if (tagIds) {
    const tagIdArray = Array.isArray(tagIds) ? tagIds.map(Number) : [Number(tagIds)]
    results = results.filter(fanfic =>
      fanfic.tags.some(tag => tagIdArray.includes(tag.id))
    )
  }

  // Filter by search text
  if (searchText && typeof searchText === 'string' && searchText.trim()) {
    const searchTerm = searchText.toLowerCase().trim()
    results = results.filter(fanfic =>
      fanfic.title.toLowerCase().includes(searchTerm) ||
      fanfic.summary.toLowerCase().includes(searchTerm) ||
      fanfic.author.name.toLowerCase().includes(searchTerm)
    )
  }

  return results
})
