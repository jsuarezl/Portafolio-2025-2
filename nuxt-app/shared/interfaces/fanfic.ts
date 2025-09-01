import type { Author } from './author'
import type { Fandom } from './fandom'
import type { Tag } from './tag'
import type { Warning } from './warning'

export interface Fanfic {
  id: number
  title: string
  summary: string
  author: Author
  fandoms: Fandom[]
  tags: Tag[]
  warnings: Warning[]
  language: string
  url?: string
  external: boolean
  created_at: string
  updated_at?: string
}
