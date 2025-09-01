<template>
  <CustomCard class="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
    <template #header>
      <div class="p-4 pb-0">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-bold text-gray-800">
            {{ library.name }}
          </h3>
          <div class="flex items-center space-x-2">
            <Badge
              v-if="library.published"
              value="Público"
              severity="success"
              class="text-xs"
            />
            <Badge
              v-else
              value="Privado"
              severity="secondary"
              class="text-xs"
            />
          </div>
        </div>
        <div class="flex items-center text-xs text-gray-500 gap-1">
          <i class="pi pi-calendar w-3 h-3 mr-1"></i>
          <span>{{ useDateFormat(library.created_at, 'MMM DD YYYY') }}</span>
          <span v-if="library.updated_at" class="ml-2">
            • Actualizado {{ useDateFormat(library.updated_at, 'MMM DD YYYY') }}
          </span>
        </div>
      </div>
    </template>

    <template #content>
      <div class="px-4">
        <!-- Description -->
        <p v-if="library.description" class="text-gray-700 text-sm mt-2 mb-4">
          {{ library.description }}
        </p>

        <!-- Stats -->
        <div class="flex items-center justify-between text-xs text-gray-600 mb-4">
          <div class="flex items-center gap-1">
            <i class="pi pi-book w-3 h-3 mr-1"></i>
            <span>{{ entryCount }} {{ entryCount === 1 ? 'historia' : 'historias' }}</span>
          </div>
          <div class="flex items-center gap-1">
            <i class="pi pi-user w-3 h-3 mr-1"></i>
            <span>Creado por Usuario {{ library.user_id }}</span>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="p-4 pt-2 border-t border-gray-100">
        <Button
          label="Ver Biblioteca"
          icon="pi pi-eye"
          class="w-full"
          size="small"
          @click="openLibrary"
        />
      </div>
    </template>
  </CustomCard>
</template>

<script setup lang="ts">
import type { Library } from '#shared/interfaces/library'
import { useDateFormat } from "@vueuse/shared"

interface Props {
  library: Library
  entryCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  entryCount: 0
})

const openLibrary = () => {
  navigateTo(`/libraries/${props.library.id}`)
}
</script>
