<template>
  <CustomCard class="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
    <template #header>
      <div class="p-4 pb-0">
        <h3 class="text-lg font-bold text-gray-800 mb-2">
          {{ fanfic.title }}
        </h3>
        <div class="flex items-center text-sm text-gray-600 mb-2">
          <i class="pi pi-user w-4 h-4 mr-1"></i>
          <span>{{ fanfic.author.name }}</span>
          <Badge
              v-if="fanfic.author.alias"
              value="Alias"
              severity="info"
              class="ml-2"
          />
        </div>
        <div class="flex items-center text-xs text-gray-500 gap-1">
          <i class="pi pi-calendar w-3 h-3 mr-1"></i>
          <span>{{ useDateFormat(fanfic.created_at, 'MMM DD YYYY') }}</span>
          <span v-if="fanfic.updated_at" class="ml-2">
            • Actualizado {{ useDateFormat(fanfic.updated_at, 'MMM DD YYYY') }}
          </span>
        </div>
        <div class="flex items-center text-xs text-gray-500 mt-1 gap-1">
          <i class="pi pi-globe w-3 h-3 mr-1"></i>
          <span>Idioma: {{ fanfic.language }}</span>
        </div>
      </div>
    </template>

    <template #content>
      <div class="px-4">
        <!-- Summary -->
        <p class="text-gray-700 text-sm mt-2 mb-4">
          {{ fanfic.summary }}
        </p>

        <!-- Warnings -->
        <div v-if="fanfic.warnings.length > 0" class="mb-4">
          <div class="flex items-center mb-2">
            <i class="pi pi-exclamation-triangle w-4 h-4 text-red-500 mr-1"></i>
            <span class="text-sm font-medium text-red-700">Advertencias de Contenido</span>
          </div>
          <div class="flex flex-wrap gap-1">
            <Badge
                v-for="warning in fanfic.warnings"
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
                v-for="fandom in fanfic.fandoms"
                :key="fandom.id"
                :value="fandom.name"
                severity="primary"
                class="text-xs"
            />
          </div>
        </div>

        <!-- Tags -->
        <div v-if="fanfic.tags.length > 0">
          <div class="flex items-center mb-2">
            <i class="pi pi-tag w-4 h-4 text-green-500 mr-1"></i>
            <span class="text-sm font-medium text-gray-700">Etiquetas</span>
          </div>
          <div class="flex flex-wrap gap-1">
            <Badge
                v-for="tag in fanfic.tags"
                :key="tag.id"
                :value="tag.name"
                :severity="tag.required ? 'danger' : 'success'"
                class="text-xs"
            />
          </div>
        </div>

        <!-- External Link Indicator -->
        <div v-if="fanfic.external" class="mt-4 pt-2 border-t border-gray-200">
          <div class="flex items-center text-xs text-blue-600">
            <i class="pi pi-external-link w-3 h-3 mr-1"></i>
            <span>Enlace Externo</span>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="p-4 pt-2 border-t border-gray-100">
        <Button
            :label="fanfic.external ? 'Leer en Sitio Externo' : 'Leer Fanfic'"
            :icon="fanfic.external ? 'pi pi-external-link' : 'pi pi-book'"
            class="w-full"
            size="small"
            @click="openFanfic"
        />
      </div>
    </template>
  </CustomCard>
</template>

<script setup lang="ts">
import type { Fanfic } from '#shared/interfaces/fanfic'
import { useDateFormat } from "@vueuse/shared";

interface Props {
  fanfic: Fanfic
}

const props = defineProps<Props>()

const openFanfic = () => {
  if (props.fanfic.external && props.fanfic.url) {
    window.open(props.fanfic.url, '_blank')
  } else {
    // Navigate to internal fanfic page
    navigateTo(`/fanfics/${props.fanfic.id}`)
  }
}
</script>
