<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-orange-600 to-purple-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Bienvenido a Fanstore
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-orange-100">
            Descubre fanfictions de tus fandoms favoritos
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/search">
              <Button
                label="Buscar Fanfics"
                icon="pi pi-search"
                size="large"
                class="bg-white text-orange-600 hover:bg-gray-100 border-0"
              />
            </NuxtLink>
            <Button
              label="Explorar Categorías"
              icon="pi pi-list"
              size="large"
              outlined
              class="text-white border-white hover:bg-white hover:text-orange-600"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Recently Uploaded Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Subidos Recientemente
          </h2>
          <p class="text-gray-600">
            Historias recientes de autores talentosos
          </p>
        </div>
        <NuxtLink to="/search">
          <Button
            label="Ver Todo"
            icon="pi pi-arrow-right"
            text
            class="text-orange-600 hover:bg-orange-50"
          />
        </NuxtLink>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <ProgressSpinner class="w-12 h-12" />
        <p class="mt-4 text-gray-600">Cargando fanfics recientes...</p>
      </div>

      <!-- Recent Fanfics Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <FanficCard
          v-for="fanfic in recentFanfics"
          :key="fanfic.id"
          :fanfic="fanfic"
        />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-white py-12 border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-orange-600 mb-2">{{ totalFanfics }}+</div>
            <div class="text-gray-600">Historias Disponibles</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-purple-600 mb-2">{{ totalFandoms }}+</div>
            <div class="text-gray-600">Fandoms Cubiertos</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-blue-600 mb-2">{{ totalAuthors }}+</div>
            <div class="text-gray-600">Autores Activos</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Fanfic } from '#shared/interfaces/fanfic'

// SEO
useHead({
  title: 'Fanstore - Inicio',
  meta: [
    { name: 'description', content: 'Bienvenido a Fanstore. Descubre fanfiction increíble de tus fandoms favoritos. Explora historias subidas recientemente y descubre nuevos mundos.' },
    { name: 'keywords', content: 'fanfiction, fanfic, historias, fandom, lectura, literatura, inicio' }
  ]
})

const { cachedFanfics, cachedFandoms } = useFanfics()

const isLoading = ref(true)
const recentFanfics = ref<Fanfic[]>([])

// Stats for the stats section
const totalFanfics = computed(() => cachedFanfics.value.length)
const totalFandoms = computed(() => cachedFandoms.value.length)
const totalAuthors = computed(() => {
  const authors = new Set(cachedFanfics.value.map(fanfic => fanfic.author.id))
  return authors.size
})

// Get recently uploaded fanfics (sorted by creation date, take first 6)
const getRecentFanfics = () => {
  const sorted = [...cachedFanfics.value].sort((a, b) => {
    const dateA = new Date(a.created_at)
    const dateB = new Date(b.created_at)
    return dateB.getTime() - dateA.getTime()
  })

  return sorted.slice(0, 6) // Show only first 6 recent fanfics
}

// Watch for cached data to be loaded and update recent fanfics
watch(cachedFanfics, (newFanfics) => {
  if (newFanfics.length > 0) {
    recentFanfics.value = getRecentFanfics()
    isLoading.value = false
  }
}, { immediate: true })

// Fallback timeout in case data doesn't load
onMounted(() => {
  setTimeout(() => {
    if (isLoading.value) {
      isLoading.value = false
    }
  }, 3000)
})
</script>
