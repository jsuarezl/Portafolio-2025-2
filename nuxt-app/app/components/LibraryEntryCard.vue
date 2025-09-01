<template>
  <CustomCard class="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
    <template #header>
      <div class="p-4 pb-0">
        <h3 class="text-lg font-bold text-gray-800 mb-2">
          {{ entry.fanfic.title }}
        </h3>
        <div class="flex items-center text-sm text-gray-600 mb-2">
          <i class="pi pi-user w-4 h-4 mr-1"></i>
          <span>{{ entry.fanfic.author.name }}</span>
          <Badge
            v-if="entry.fanfic.author.alias"
            value="Alias"
            severity="info"
            class="ml-2"
          />
          <div v-if="entry.rating" class="ml-auto flex items-center">
            <i class="pi pi-star-fill w-3 h-3 mr-1 text-yellow-500"></i>
            <span class="text-xs">{{ entry.rating }}/5</span>
          </div>
        </div>
        <div class="flex items-center text-xs text-gray-500 gap-1">
          <i class="pi pi-calendar w-3 h-3 mr-1"></i>
          <span>{{ useDateFormat(entry.fanfic.created_at, 'MMM DD YYYY') }}</span>
          <span v-if="entry.fanfic.updated_at" class="ml-2">
            • Actualizado {{ useDateFormat(entry.fanfic.updated_at, 'MMM DD YYYY') }}
          </span>
        </div>
        <div class="flex items-center text-xs text-gray-500 mt-1 gap-1">
          <i class="pi pi-globe w-3 h-3 mr-1"></i>
          <span>Idioma: {{ entry.fanfic.language }}</span>
        </div>
      </div>
    </template>

    <template #content>
      <div class="px-4">
        <!-- Summary (custom or original) -->
        <div class="mb-4">
          <div v-if="entry.summary" class="mb-2">
            <div class="flex items-center my-2 gap-1">
              <i class="pi pi-comment w-3 h-3 mr-1 text-blue-500"></i>
              <span class="text-xs font-medium text-blue-700">Personal Note</span>
            </div>
            <p class="text-gray-700 text-sm italic border-l-2 border-blue-200 pl-2">
              {{ entry.summary }}
            </p>
          </div>
          <div v-else>
            <p class="text-gray-700 text-sm my-2">
              {{ entry.fanfic.summary }}
            </p>
          </div>
        </div>

        <!-- Warnings -->
        <div v-if="entry.fanfic.warnings.length > 0" class="mb-4">
          <div class="flex items-center mb-2">
            <i class="pi pi-exclamation-triangle w-4 h-4 text-red-500 mr-1"></i>
            <span class="text-sm font-medium text-red-700">Content Warnings</span>
          </div>
          <div class="flex flex-wrap gap-1">
            <Badge
              v-for="warning in entry.fanfic.warnings"
              :key="warning.id"
              :value="warning.name"
              severity="danger"
              class="text-xs"
            />
          </div>
        </div>

        <!-- Fandoms -->
        <div class="mb-4">
          <div class="flex items-center mb-2">
            <i class="pi pi-globe w-4 h-4 text-blue-500 mr-1"></i>
            <span class="text-sm font-medium text-gray-700">Fandoms</span>
          </div>
          <div class="flex flex-wrap gap-1">
            <Badge
              v-for="fandom in entry.fanfic.fandoms"
              :key="fandom.id"
              :value="fandom.name"
              severity="primary"
              class="text-xs"
            />
          </div>
        </div>

        <!-- Combined Tags (original + additional) -->
        <div v-if="combinedTags.length > 0">
          <div class="flex items-center mb-2">
            <i class="pi pi-tag w-4 h-4 text-green-500 mr-1"></i>
            <span class="text-sm font-medium text-gray-700">Tags</span>
          </div>
          <div class="flex flex-wrap gap-1">
            <!-- Original fanfic tags -->
            <Badge
              v-for="tag in entry.fanfic.tags"
              :key="`original-${tag.id}`"
              :value="tag.name"
              :severity="tag.required ? 'danger' : 'success'"
              class="text-xs"
            />
            <!-- Additional user tags -->
            <Badge
              v-for="tag in entry.additionalTags"
              :key="`additional-${tag.id}`"
              :value="`+${tag.name}`"
              severity="info"
              class="text-xs"
            />
          </div>
        </div>

        <!-- External Link Indicator -->
        <div v-if="entry.fanfic.external" class="mt-4 pt-2 border-t border-gray-200">
          <div class="flex items-center text-xs text-blue-600">
            <i class="pi pi-external-link w-3 h-3 mr-1"></i>
            <span>External Link</span>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="p-4 pt-2 border-t border-gray-100">
        <Button
          :label="entry.fanfic.external ? 'Read on External Site' : 'Read Fanfic'"
          :icon="entry.fanfic.external ? 'pi pi-external-link' : 'pi pi-book'"
          class="w-full"
          size="small"
          @click="openFanfic"
        />
      </div>
    </template>
  </CustomCard>
</template>

<script setup lang="ts">
import type { LibraryEntry } from '#shared/interfaces/libraryEntry'
import type { Tag } from '#shared/interfaces/tag'
import { useDateFormat } from "@vueuse/shared"

interface Props {
  entry: LibraryEntry
}

const props = defineProps<Props>()

// Combine original fanfic tags with additional user tags
const combinedTags = computed((): Tag[] => {
  return [...props.entry.fanfic.tags, ...props.entry.additionalTags]
})

const openFanfic = () => {
  if (props.entry.fanfic.external && props.entry.fanfic.url) {
    window.open(props.entry.fanfic.url, '_blank')
  } else {
    // Navigate to internal fanfic page
    navigateTo(`/fanfics/${props.entry.fanfic.id}`)
  }
}
</script>
