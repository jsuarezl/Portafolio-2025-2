<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Buscar Fanfics</h2>

    <div class="space-y-4">
      <!-- Text Search -->
      <div class="flex flex-col">
        <label for="search-text" class="text-sm font-medium text-gray-700 mb-2">
          Buscar por título, resumen o autor
        </label>
        <InputText
          id="search-text"
          v-model="searchText"
          placeholder="Ingresa términos de búsqueda..."
          class="w-full"
          @input="onSearchChange"
        />
      </div>

      <!-- Fandom Filter -->
      <div class="flex flex-col">
        <label for="fandom-select" class="text-sm font-medium text-gray-700 mb-2">
          Filtrar por Fandoms
        </label>
        <MultiSelect
          id="fandom-select"
          v-model="selectedFandoms"
          :options="fandoms"
          option-label="name"
          option-value="id"
          placeholder="Selecciona fandoms..."
          class="w-full"
          :max-selected-labels="3"
          @change="onFiltersChange"
        >
          <template #option="{ option }">
            <div class="flex flex-col">
              <span class="font-medium">{{ option.name }}</span>
              <span v-if="option.description" class="text-sm text-gray-500">
                {{ option.description }}
              </span>
            </div>
          </template>
        </MultiSelect>
      </div>

      <!-- Tags Filter -->
      <div class="flex flex-col">
        <label for="tags-select" class="text-sm font-medium text-gray-700 mb-2">
          Filtrar por Etiquetas
        </label>
        <MultiSelect
          id="tags-select"
          v-model="selectedTags"
          :options="tags"
          option-label="name"
          option-value="id"
          placeholder="Selecciona etiquetas..."
          class="w-full"
          :max-selected-labels="5"
          @change="onFiltersChange"
        >
          <template #option="{ option }">
            <div class="flex items-center">
              <span class="font-medium">{{ option.name }}</span>
              <Badge
                v-if="option.required"
                value="Obligatorio"
                severity="danger"
                class="ml-2"
              />
            </div>
          </template>
        </MultiSelect>
      </div>

      <!-- Clear Filters Button -->
      <div class="flex justify-between items-center pt-2">
        <Button
          label="Limpiar Filtros"
          severity="secondary"
          outlined
          @click="clearFilters"
          :disabled="!hasActiveFilters"
        />

        <div class="text-sm text-gray-600">
          {{ filteredCount }} {{ filteredCount === 1 ? 'resultado' : 'resultados' }} encontrados
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Fanfic } from '#shared/interfaces/fanfic'

const { cachedFandoms, cachedTags, searchFanfics } = useFanfics()

const fandoms = cachedFandoms
const tags = cachedTags

const searchText = ref('')
const selectedFandoms = ref<number[]>([])
const selectedTags = ref<number[]>([])

// Emit search results to parent component
const emit = defineEmits<{
  search: [results: Fanfic[]]
}>()

const filteredCount = ref(0)

const hasActiveFilters = computed(() => {
  return searchText.value.trim() !== '' ||
         selectedFandoms.value.length > 0 ||
         selectedTags.value.length > 0
})

const performSearch = async () => {
  try {
    const results = await searchFanfics({
      fandomIds: selectedFandoms.value.length > 0 ? selectedFandoms.value : undefined,
      tagIds: selectedTags.value.length > 0 ? selectedTags.value : undefined,
      searchText: searchText.value.trim() || undefined
    })

    filteredCount.value = results.length
    emit('search', results)
  } catch (error) {
    console.error('Error searching fanfics:', error)
    filteredCount.value = 0
    emit('search', [])
  }
}

const onSearchChange = () => {
  performSearch()
}

const onFiltersChange = () => {
  performSearch()
}

const clearFilters = () => {
  searchText.value = ''
  selectedFandoms.value = []
  selectedTags.value = []
  performSearch()
}

// Initial search to show all fanfics
onMounted(() => {
  performSearch()
})
</script>
