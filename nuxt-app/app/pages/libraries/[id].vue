<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-96">
      <ProgressSpinner class="w-12 h-12" />
      <p class="mt-4 text-gray-600">Cargando biblioteca...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <i class="pi pi-exclamation-triangle w-16 h-16 text-red-400 mx-auto mb-4 block"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Biblioteca no encontrada</h3>
        <p class="text-gray-600">
          La biblioteca que buscas no existe o no tienes permisos para verla.
        </p>
        <NuxtLink to="/">
          <Button
            label="Ir al Inicio"
            icon="pi pi-home"
            class="mt-4"
          />
        </NuxtLink>
      </div>
    </div>

    <!-- Library Content -->
    <div v-else-if="library">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <div class="flex items-center mb-2">
                <h1 class="text-3xl font-bold text-gray-900">{{ library.name }}</h1>
                <Badge
                  v-if="library.published"
                  value="Pública"
                  severity="success"
                  class="ml-3"
                />
                <Badge
                  v-else
                  value="Privada"
                  severity="secondary"
                  class="ml-3"
                />
              </div>
              <div class="flex items-center text-sm text-gray-600 mb-2">
                <i class="pi pi-user w-4 h-4 mr-1"></i>
                <span>Creado por User {{ library.user_id }}</span>
                <span class="mx-2">•</span>
                <i class="pi pi-calendar w-4 h-4 mr-1"></i>
                <span>{{ useDateFormat(library.created_at, 'MMM DD YYYY') }}</span>
                <span v-if="library.updated_at" class="mx-2">•</span>
                <span v-if="library.updated_at">
                  Actualizado {{ useDateFormat(library.updated_at, 'MMM DD YYYY') }}
                </span>
              </div>
              <p v-if="library.description" class="text-gray-700 mt-2">
                {{ library.description }}
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <Button
                icon="pi pi-arrow-left"
                text
                rounded
                aria-label="Volver"
                @click="goBack"
              />
            </div>
          </div>

          <!-- Stats -->
          <div class="flex items-center space-x-6 text-sm text-gray-600">
            <div class="flex items-center">
              <i class="pi pi-book w-4 h-4 mr-1"></i>
              <span>{{ entries.length }} {{ entries.length === 1 ? 'historia' : 'historias' }}</span>
            </div>
            <div v-if="ratedEntries.length > 0" class="flex items-center">
              <i class="pi pi-star-fill w-4 h-4 mr-1 text-yellow-500"></i>
              <span>{{ averageRating.toFixed(1) }} calificación promedio</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Library Entries -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- No entries -->
        <div v-if="entries.length === 0" class="text-center py-12">
          <i class="pi pi-book w-16 h-16 text-gray-400 mx-auto mb-4 block"></i>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No hay historias en esta biblioteca</h3>
          <p class="text-gray-600">
            Esta biblioteca aún no contiene historias.
          </p>
        </div>

        <!-- Entries Grid -->
        <div v-else>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-800">
              Contenido de la biblioteca
            </h2>
            <div class="text-sm text-gray-600">
              Mostrando {{ entries.length }} {{ entries.length === 1 ? 'historia' : 'historias' }}
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <LibraryEntryCard
              v-for="entry in entries"
              :key="entry.id"
              :entry="entry"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Library } from '#shared/interfaces/library'
import type { LibraryEntry } from '#shared/interfaces/libraryEntry'
import { useDateFormat } from "@vueuse/shared"

// Get library ID from route
const route = useRoute()
const libraryId = Number(route.params.id)

// SEO
useHead({
  title: 'Biblioteca - Fanstore',
  meta: [
    { name: 'description', content: 'Ve una biblioteca curada de historias fanfiction con resúmenes y etiquetas personalizadas.' },
    { name: 'keywords', content: 'fanfiction, biblioteca, colección, historias, personalizado, curado' }
  ]
})

const { getLibraryById, getLibraryEntries } = useLibraries()

const isLoading = ref(true)
const error = ref(false)
const library = ref<Library | null>(null)
const entries = ref<LibraryEntry[]>([])

// Computed properties for stats
const ratedEntries = computed(() => entries.value.filter(entry => entry.rating !== null))
const averageRating = computed(() => {
  if (ratedEntries.value.length === 0) return 0
  const total = ratedEntries.value.reduce((sum, entry) => sum + (entry.rating || 0), 0)
  return total / ratedEntries.value.length
})

// Load library and entries
const loadLibrary = async () => {
  try {
    isLoading.value = true
    error.value = false

    const [libraryData, entriesData] = await Promise.all([
      getLibraryById(libraryId),
      getLibraryEntries(libraryId)
    ])

    library.value = libraryData
    entries.value = entriesData

    // Update page title with library name
    useHead({
      title: `${libraryData.name} - Biblioteca - Fanstore`
    })
  } catch (err) {
    console.error('Error loading library:', err)
    error.value = true
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  // Navigate back or to libraries page
  if (history.length > 1) {
    history.back()
  } else {
    navigateTo('/')
  }
}

// Load data on mount
onMounted(loadLibrary)
</script>
