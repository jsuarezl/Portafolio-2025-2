<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900">Bibliotecas</h1>
        <p class="mt-2 text-gray-600">
          Explora colecciones curadas de historias fanfiction con resúmenes y etiquetas personalizadas
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Explorar Bibliotecas</h2>

        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Search Input -->
          <div class="flex-1">
            <InputText
              v-model="searchText"
              placeholder="Buscar bibliotecas por nombre o descripción..."
              class="w-full"
              @input="filterLibraries"
            />
          </div>

          <!-- Filter Options -->
          <div class="flex gap-4">
            <Dropdown
              v-model="selectedFilter"
              :options="filterOptions"
              option-label="label"
              option-value="value"
              placeholder="Filtrar por"
              class="w-40"
              @change="filterLibraries"
            />

            <Button
              label="Limpiar"
              severity="secondary"
              outlined
              @click="clearFilters"
              :disabled="!hasActiveFilters"
            />
          </div>
        </div>

        <div class="mt-4 text-sm text-gray-600">
          {{ filteredLibraries.length }} {{ filteredLibraries.length === 1 ? 'biblioteca' : 'bibliotecas' }} encontradas
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <ProgressSpinner class="w-12 h-12" />
        <p class="mt-4 text-gray-600">Cargando bibliotecas...</p>
      </div>

      <!-- No Results -->
      <div v-else-if="filteredLibraries.length === 0" class="text-center py-12">
        <i class="pi pi-search w-16 h-16 text-gray-400 mx-auto mb-4 block"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No se encontraron bibliotecas</h3>
        <p class="text-gray-600">
          Intenta ajustar tus términos de búsqueda o filtros para encontrar más resultados.
        </p>
      </div>

      <!-- Libraries Grid -->
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <LibraryCard
            v-for="library in filteredLibraries"
            :key="library.id"
            :library="library"
            :entry-count="getLibraryEntryCount(library.id)"
          />
        </div>

        <!-- Load More (for future pagination) -->
        <div v-if="filteredLibraries.length >= 12" class="mt-8 text-center">
          <Button
            label="Cargar Más"
            icon="pi pi-chevron-down"
            outlined
            @click="loadMore"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Library } from '#shared/interfaces/library'
import type { LibraryEntry } from '#shared/interfaces/libraryEntry'

// SEO
useHead({
  title: 'Bibliotecas - Explorar Colecciones - Fanstore',
  meta: [
    { name: 'description', content: 'Explora bibliotecas curadas de historias fanfiction. Descubre colecciones con resúmenes personalizados, calificaciones y etiquetas adicionales de otros lectores.' },
    { name: 'keywords', content: 'fanfiction, bibliotecas, colecciones, curadas, explorar, resúmenes personalizados, etiquetas' }
  ]
})

const { getAllLibraries, getAllLibraryEntries } = useLibraries()

const isLoading = ref(true)
const libraries = ref<Library[]>([])
const filteredLibraries = ref<Library[]>([])
const libraryEntries = ref<LibraryEntry[]>([])
const searchText = ref('')
const selectedFilter = ref('all')

const filterOptions = [
  { label: 'Todas las Bibliotecas', value: 'all' },
  { label: 'Solo Públicas', value: 'public' },
  { label: 'Actualizadas Recientemente', value: 'recent' },
  { label: 'Más Historias', value: 'most_stories' }
]

const hasActiveFilters = computed(() => {
  return searchText.value.trim() !== '' || selectedFilter.value !== 'all'
})

// Get entry count for a library
const getLibraryEntryCount = (libraryId: number): number => {
  return libraryEntries.value.filter(entry => entry.library_id === libraryId).length
}

// Filter libraries based on search and filters
const filterLibraries = () => {
  let results = [...libraries.value]

  // Text search
  if (searchText.value.trim()) {
    const searchTerm = searchText.value.toLowerCase().trim()
    results = results.filter(library =>
      library.name.toLowerCase().includes(searchTerm) ||
      (library.description && library.description.toLowerCase().includes(searchTerm))
    )
  }

  // Apply filters
  switch (selectedFilter.value) {
    case 'public':
      results = results.filter(library => library.published)
      break
    case 'recent':
      results = results.sort((a, b) => {
        const dateA = new Date(a.updated_at || a.created_at)
        const dateB = new Date(b.updated_at || b.created_at)
        return dateB.getTime() - dateA.getTime()
      })
      break
    case 'most_stories':
      results = results.sort((a, b) => {
        const countA = getLibraryEntryCount(a.id)
        const countB = getLibraryEntryCount(b.id)
        return countB - countA
      })
      break
  }

  filteredLibraries.value = results
}

const clearFilters = () => {
  searchText.value = ''
  selectedFilter.value = 'all'
  filterLibraries()
}

const loadMore = () => {
  // Placeholder for future pagination implementation
  console.log('Load more libraries')
}

// Load libraries on mount
const loadLibraries = async () => {
  try {
    isLoading.value = true

    // Get all published libraries and all library entries
    const [librariesData, entriesData] = await Promise.all([
      getAllLibraries({ published: true }),
      getAllLibraryEntries()
    ])

    libraries.value = librariesData
    libraryEntries.value = entriesData
    filterLibraries()
  } catch (error) {
    console.error('Error loading libraries:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(loadLibraries)
</script>
