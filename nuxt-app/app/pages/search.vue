<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900">Buscar Fanfics</h1>
        <p class="mt-2 text-gray-600">
          Encuentra tu próxima historia favorita por fandom, etiquetas o términos de búsqueda
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Search Filters Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-8">
            <FanficSearchFilters @search="handleSearch" />
          </div>
        </div>

        <!-- Results Area -->
        <div class="lg:col-span-3">
          <!-- Loading State -->
          <div v-if="isLoading" class="text-center py-12">
            <ProgressSpinner class="w-12 h-12" />
            <p class="mt-4 text-gray-600">Cargando fanfics...</p>
          </div>

          <!-- No Results -->
          <div v-else-if="searchResults.length === 0" class="text-center py-12">
            <i class="pi pi-search w-16 h-16 text-gray-400 mx-auto mb-4 block"></i>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No se encontraron fanfics</h3>
            <p class="text-gray-600">
              Intenta ajustar tus filtros de búsqueda o términos de búsqueda para encontrar más resultados.
            </p>
          </div>

          <!-- Results Grid -->
          <div v-else>
            <!-- Results Header -->
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-gray-800">
                Resultados de Búsqueda
              </h2>
              <div class="flex items-center space-x-4">
                <div class="text-sm text-gray-600">
                  {{ searchResults.length }} {{ searchResults.length === 1 ? 'resultado' : 'resultados' }}
                </div>
                <!-- Sort Options -->
                <Dropdown
                  v-model="sortBy"
                  :options="sortOptions"
                  option-label="label"
                  option-value="value"
                  placeholder="Ordenar por"
                  class="w-40"
                  @change="handleSort"
                />
              </div>
            </div>

            <!-- Fanfic Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <FanficCard
                v-for="fanfic in sortedResults"
                :key="fanfic.id"
                :fanfic="fanfic"
              />
            </div>

            <!-- Pagination (for future implementation) -->
            <div v-if="searchResults.length > 12" class="mt-8 flex justify-center">
              <Paginator
                :rows="12"
                :total-records="searchResults.length"
                :rows-per-page-options="[12, 24, 48]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
    <div class="fixed bottom-6 right-6">
      <Button
        icon="pi pi-chevron-up"
        rounded
        aria-label="Volver Arriba"
        @click="scrollToTop"
        class="shadow-lg"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Fanfic } from '#shared/interfaces/fanfic'

// SEO
useHead({
  title: 'Buscar Fanfics - Encuentra Tu Próxima Historia Favorita',
  meta: [
    { name: 'description', content: 'Busca en una vasta colección de fanfiction de tus fandoms favoritos. Encuentra historias por etiquetas, advertencias y más.' },
    { name: 'keywords', content: 'fanfiction, fanfic, buscar, historias, fandom, lectura, literatura' }
  ]
})

const searchResults = ref<Fanfic[]>([])
const isLoading = ref(true)
const sortBy = ref('updated')

const sortOptions = [
  { label: 'Actualizados Recientemente', value: 'updated' },
  { label: 'Creados Recientemente', value: 'created' },
  { label: 'Título A-Z', value: 'title_asc' },
  { label: 'Título Z-A', value: 'title_desc' },
  { label: 'Autor A-Z', value: 'author_asc' },
  { label: 'Autor Z-A', value: 'author_desc' }
]

const sortedResults = computed(() => {
  const results = [...searchResults.value]

  switch (sortBy.value) {
    case 'updated':
      return results.sort((a, b) => {
        const dateA = new Date(a.updated_at || a.created_at)
        const dateB = new Date(b.updated_at || b.created_at)
        return dateB.getTime() - dateA.getTime()
      })
    case 'created':
      return results.sort((a, b) => {
        const dateA = new Date(a.created_at)
        const dateB = new Date(b.created_at)
        return dateB.getTime() - dateA.getTime()
      })
    case 'title_asc':
      return results.sort((a, b) => a.title.localeCompare(b.title))
    case 'title_desc':
      return results.sort((a, b) => b.title.localeCompare(a.title))
    case 'author_asc':
      return results.sort((a, b) => a.author.name.localeCompare(b.author.name))
    case 'author_desc':
      return results.sort((a, b) => b.author.name.localeCompare(a.author.name))
    default:
      return results
  }
})

const handleSearch = (results: Fanfic[]) => {
  isLoading.value = true
  // Simulate loading delay for better UX
  setTimeout(() => {
    searchResults.value = results
    isLoading.value = false
  }, 300)
}

const handleSort = () => {
  // Sorting is handled by the computed property
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Initial loading state
onMounted(() => {
  // The search component will emit results on mount
  setTimeout(() => {
    if (searchResults.value.length === 0) {
      isLoading.value = false
    }
  }, 1000)
})
</script>
