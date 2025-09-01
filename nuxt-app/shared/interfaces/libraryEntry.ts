import type { Fanfic } from './fanfic'
import type { Tag } from './tag'

export interface LibraryEntry {
  id: number
  library_id: number
  fanfic_id: number
  fanfic: Fanfic
  ordering: number
  summary?: string // Custom summary, if null use fanfic.summary
  rating?: number
  additionalTags: Tag[] // Extra tags added by user
  created_at: string
  updated_at?: string
}
