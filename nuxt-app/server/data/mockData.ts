export const mockAuthors = [
  { id: 1, name: "WizardWriter", alias: true },
  { id: 2, name: "Sarah Johnson", alias: false },
  { id: 3, name: "MagicPen", alias: true },
  { id: 4, name: "StoryWeaver", alias: true },
  { id: 5, name: "FantasyFan", alias: true }
]

export const mockFandoms = [
  { id: 1, name: "Harry Potter", description: "The wizarding world of Harry Potter" },
  { id: 2, name: "Marvel Cinematic Universe", description: "Marvel superheroes and their adventures" },
  { id: 3, name: "Sherlock Holmes", description: "The detective stories of Sherlock Holmes" },
  { id: 4, name: "Star Wars", description: "A galaxy far, far away" },
  { id: 5, name: "My Hero Academia", description: "A world where superpowers are common" },
  { id: 6, name: "The Witcher", description: "Fantasy world of monsters and magic" }
]

export const mockTags = [
  { id: 1, name: "Romance", required: false },
  { id: 2, name: "Angst", required: false },
  { id: 3, name: "Fluff", required: false },
  { id: 4, name: "Hurt/Comfort", required: false },
  { id: 5, name: "Alternate Universe", required: false },
  { id: 6, name: "Time Travel", required: false },
  { id: 7, name: "Enemies to Lovers", required: false },
  { id: 8, name: "Found Family", required: false },
  { id: 9, name: "Fix-It", required: false },
  { id: 10, name: "Crossover", required: false }
]

export const mockWarnings = [
  { id: 1, name: "Graphic Violence" },
  { id: 2, name: "Major Character Death" },
  { id: 3, name: "Explicit Sexual Content" },
  { id: 4, name: "Underage" },
  { id: 5, name: "Rape/Non-Con" },
  { id: 6, name: "Self-Harm" },
  { id: 7, name: "Suicide" }
]

export const mockFanfics = [
  {
    id: 1,
    title: "The Boy Who Lived Again",
    summary: "Harry Potter gets a second chance at life and decides to change everything. A time travel fix-it where Harry goes back to his first year with all his memories intact.",
    author: mockAuthors[0],
    fandoms: [mockFandoms[0]],
    tags: [mockTags[5], mockTags[8], mockTags[0]],
    warnings: [],
    language: "English",
    external: false,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-08-20T14:45:00Z"
  },
  {
    id: 2,
    title: "Iron Hearts",
    summary: "Tony Stark and Steve Rogers navigate their complicated relationship while saving the world. A slow-burn romance set during the events of Civil War.",
    author: mockAuthors[1],
    fandoms: [mockFandoms[1]],
    tags: [mockTags[0], mockTags[6], mockTags[1]],
    warnings: [mockWarnings[0]],
    language: "English",
    external: false,
    created_at: "2024-02-10T09:15:00Z",
    updated_at: "2024-08-25T16:20:00Z"
  },
  {
    id: 3,
    title: "The Detective's Heart",
    summary: "John Watson realizes his feelings for Sherlock Holmes run deeper than friendship. A modern retelling of their relationship with emotional depth.",
    author: mockAuthors[2],
    fandoms: [mockFandoms[2]],
    tags: [mockTags[0], mockTags[3], mockTags[2]],
    warnings: [],
    language: "English",
    external: false,
    created_at: "2024-03-05T11:45:00Z"
  },
  {
    id: 4,
    title: "Jedi Academy Chronicles",
    summary: "A young padawan discovers a dark secret within the Jedi Temple. An alternate universe story exploring the corruption within the Jedi Order.",
    author: mockAuthors[3],
    fandoms: [mockFandoms[3]],
    tags: [mockTags[4], mockTags[1], mockTags[8]],
    warnings: [mockWarnings[0], mockWarnings[1]],
    language: "English",
    external: false,
    created_at: "2024-04-12T13:20:00Z",
    updated_at: "2024-07-30T10:10:00Z"
  },
  {
    id: 5,
    title: "Plus Ultra Family",
    summary: "Class 1-A becomes more than just classmates—they become a true family. A heartwarming story about friendship, growth, and finding your place in the world.",
    author: mockAuthors[4],
    fandoms: [mockFandoms[4]],
    tags: [mockTags[7], mockTags[2], mockTags[3]],
    warnings: [],
    language: "English",
    external: false,
    created_at: "2024-05-18T15:30:00Z",
    updated_at: "2024-08-15T12:00:00Z"
  },
  {
    id: 6,
    title: "The White Wolf's Path",
    summary: "Geralt of Rivia faces his greatest challenge yet when ancient magic threatens to tear apart the world. A epic adventure featuring beloved characters.",
    author: mockAuthors[2],
    fandoms: [mockFandoms[5]],
    tags: [mockTags[4], mockTags[1], mockTags[0]],
    warnings: [mockWarnings[0]],
    language: "English",
    external: false,
    created_at: "2024-06-22T08:45:00Z"
  },
  {
    id: 7,
    title: "Multiverse Mayhem",
    summary: "When heroes from different universes collide, chaos ensues. A crossover adventure featuring characters from multiple fandoms working together.",
    author: mockAuthors[0],
    fandoms: [mockFandoms[1], mockFandoms[3]],
    tags: [mockTags[9], mockTags[4], mockTags[7]],
    warnings: [mockWarnings[0]],
    language: "English",
    external: false,
    created_at: "2024-07-10T14:15:00Z",
    updated_at: "2024-08-28T09:30:00Z"
  }
]

export const mockLibraries = [
  {
    id: 1,
    user_id: 1,
    published: true,
    name: "My Favorites",
    description: "A collection of my all-time favorite fanfics across different fandoms.",
    created_at: "2024-01-01T10:00:00Z",
    updated_at: "2024-08-30T15:20:00Z"
  },
  {
    id: 2,
    user_id: 1,
    published: false,
    name: "Reading List",
    description: "Stories I plan to read or am currently reading.",
    created_at: "2024-02-15T12:30:00Z",
    updated_at: "2024-08-29T18:45:00Z"
  },
  {
    id: 3,
    user_id: 2,
    published: true,
    name: "Romance Collection",
    description: "The best romance stories from various fandoms.",
    created_at: "2024-03-10T09:15:00Z"
  }
]

export const mockLibraryEntries = [
  {
    id: 1,
    library_id: 1,
    fanfic_id: 1,
    fanfic: mockFanfics[0],
    ordering: 1,
    summary: "This is my personal take on this amazing time travel story. Harry's journey back to his first year is handled with incredible depth and emotion.",
    rating: 5,
    additionalTags: [mockTags[2]], // Added "Fluff" tag
    created_at: "2024-01-01T11:00:00Z"
  },
  {
    id: 2,
    library_id: 1,
    fanfic_id: 2,
    fanfic: mockFanfics[1],
    ordering: 2,
    summary: null, // Will use original fanfic summary
    rating: 4,
    additionalTags: [mockTags[3], mockTags[7]], // Added "Hurt/Comfort" and "Found Family" tags
    created_at: "2024-01-02T14:30:00Z"
  },
  {
    id: 3,
    library_id: 2,
    fanfic_id: 4,
    fanfic: mockFanfics[3],
    ordering: 1,
    summary: "A darker take on the Jedi Order that I want to read when I have time. Looks promising based on the premise.",
    rating: null,
    additionalTags: [mockTags[1]], // Added "Angst" tag
    created_at: "2024-02-15T13:00:00Z"
  },
  {
    id: 4,
    library_id: 3,
    fanfic_id: 2,
    fanfic: mockFanfics[1],
    ordering: 1,
    summary: "The perfect slow-burn romance between Tony and Steve. Every chapter builds the tension beautifully.",
    rating: 5,
    additionalTags: [mockTags[2], mockTags[3]], // Added "Fluff" and "Hurt/Comfort" tags
    created_at: "2024-03-10T10:00:00Z"
  },
  {
    id: 5,
    library_id: 3,
    fanfic_id: 3,
    fanfic: mockFanfics[2],
    ordering: 2,
    summary: null, // Will use original fanfic summary
    rating: 4,
    additionalTags: [mockTags[2]], // Added "Fluff" tag
    created_at: "2024-03-11T16:20:00Z"
  }
]
