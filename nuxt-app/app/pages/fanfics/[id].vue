<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-96">
      <ProgressSpinner class="w-12 h-12" />
      <p class="mt-4 text-gray-600">Loading fanfic...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <i class="pi pi-exclamation-triangle w-16 h-16 text-red-400 mx-auto mb-4 block"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Fanfic not found</h3>
        <p class="text-gray-600">
          The fanfic you're looking for doesn't exist or may have been removed.
        </p>
        <div class="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/search">
            <Button
              label="Search Fanfics"
              icon="pi pi-search"
            />
          </NuxtLink>
          <NuxtLink to="/">
            <Button
              label="Go Home"
              icon="pi pi-home"
              outlined
            />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- External Fanfic Redirect -->
    <div v-else-if="fanfic && fanfic.external" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <i class="pi pi-external-link w-16 h-16 text-blue-400 mx-auto mb-4 block"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">External Fanfic</h3>
        <p class="text-gray-600 mb-6">
          This fanfic is hosted on an external site. You'll be redirected to read it there.
        </p>
        <div class="bg-white rounded-lg shadow-md p-6 mb-6 text-left max-w-2xl mx-auto">
          <h4 class="text-xl font-bold text-gray-800 mb-2">{{ fanfic.title }}</h4>
          <p class="text-gray-700 mb-4">{{ fanfic.summary }}</p>
          <div class="flex items-center text-sm text-gray-600">
            <i class="pi pi-user w-4 h-4 mr-1"></i>
            <span>{{ fanfic.author.name }}</span>
          </div>
        </div>
        <Button
          :label="`Read on External Site`"
          icon="pi pi-external-link"
          @click="openExternalFanfic"
          class="mr-4"
        />
        <Button
          label="Go Back"
          icon="pi pi-arrow-left"
          outlined
          @click="goBack"
        />
      </div>
    </div>

    <!-- Fanfic Content -->
    <div v-else-if="fanfic">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {{ fanfic.title }}
              </h1>

              <!-- Author Info -->
              <div class="flex items-center text-lg text-gray-700 mb-3">
                <i class="pi pi-user w-5 h-5 mr-2"></i>
                <span class="font-medium">{{ fanfic.author.name }}</span>
                <Badge
                  v-if="fanfic.author.alias"
                  value="Alias"
                  severity="info"
                  class="ml-2"
                />
              </div>

              <!-- Dates -->
              <div class="flex items-center text-sm text-gray-600 mb-4">
                <i class="pi pi-calendar w-4 h-4 mr-1"></i>
                <span>Publicado {{ useDateFormat(fanfic.created_at, 'MMMM DD, YYYY') }}</span>
                <span v-if="fanfic.updated_at" class="ml-4">
                  • Actualizado {{ useDateFormat(fanfic.updated_at, 'MMMM DD, YYYY') }}
                </span>
              </div>

              <!-- Language -->
              <div class="flex items-center text-sm text-gray-600 mb-4">
                <i class="pi pi-globe w-4 h-4 mr-1"></i>
                <span>Idioma: {{ fanfic.language }}</span>
              </div>
            </div>

            <!-- Back Button -->
            <div class="ml-4">
              <Button
                icon="pi pi-arrow-left"
                text
                rounded
                aria-label="Go back"
                @click="goBack"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Summary -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
              <p class="text-gray-700 leading-relaxed">{{ fanfic.summary }}</p>
            </div>

            <!-- Story Content Placeholder -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-800">Story Content</h2>
                <Badge value="Work in Progress" severity="info" />
              </div>

              <div class="prose max-w-none">
                <div class="text-center py-12 text-gray-500">
                  <i class="pi pi-book w-16 h-16 mx-auto mb-4 block opacity-50"></i>
                  <h3 class="text-lg font-medium mb-2">Story Reader Coming Soon</h3>
                  <p>The full story reading functionality is currently being developed.</p>
                  <p class="text-sm mt-2">For now, you can view the fanfic details and metadata.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Content Warnings -->
            <div v-if="fanfic.warnings.length > 0" class="bg-white rounded-lg shadow-md p-6 mb-6">
              <div class="flex items-center mb-4">
                <i class="pi pi-exclamation-triangle w-5 h-5 text-red-500 mr-2"></i>
                <h3 class="text-lg font-medium text-red-700">Content Warnings</h3>
              </div>
              <div class="flex flex-wrap gap-2">
                <Badge
                  v-for="warning in fanfic.warnings"
                  :key="warning.id"
                  :value="warning.name"
                  severity="danger"
                  class="text-sm"
                />
              </div>
            </div>

            <!-- Fandoms -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
              <div class="flex items-center mb-4">
                <i class="pi pi-globe w-5 h-5 text-blue-500 mr-2"></i>
                <h3 class="text-lg font-medium text-gray-700">Fandoms</h3>
              </div>
              <div class="flex flex-wrap gap-2">
                <Badge
                  v-for="fandom in fanfic.fandoms"
                  :key="fandom.id"
                  :value="fandom.name"
                  severity="primary"
                  class="text-sm"
                />
              </div>
            </div>

            <!-- Tags -->
            <div v-if="fanfic.tags.length > 0" class="bg-white rounded-lg shadow-md p-6 mb-6">
              <div class="flex items-center mb-4">
                <i class="pi pi-tag w-5 h-5 text-green-500 mr-2"></i>
                <h3 class="text-lg font-medium text-gray-700">Tags</h3>
              </div>
              <div class="flex flex-wrap gap-2">
                <Badge
                  v-for="tag in fanfic.tags"
                  :key="tag.id"
                  :value="tag.name"
                  :severity="tag.required ? 'danger' : 'success'"
                  class="text-sm"
                />
              </div>
            </div>

            <!-- Actions -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-medium text-gray-700 mb-4">Actions</h3>
              <div class="space-y-3">
                <Button
                  label="Add to Library"
                  icon="pi pi-bookmark"
                  class="w-full"
                  outlined
                  @click="addToLibrary"
                />
                <Button
                  label="Share"
                  icon="pi pi-share-alt"
                  class="w-full"
                  outlined
                  @click="shareFanfic"
                />
                <Button
                  label="Report Issue"
                  icon="pi pi-flag"
                  class="w-full"
                  severity="secondary"
                  outlined
                  @click="reportIssue"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Fanfic } from '#shared/interfaces/fanfic'
import { useDateFormat } from "@vueuse/shared"

// Get fanfic ID from route
const route = useRoute()
const fanficId = Number(route.params.id)

// SEO
useHead({
  title: 'Reading Fanfic - Fanstore',
  meta: [
    { name: 'description', content: 'Read fanfiction stories with detailed information about fandoms, tags, and content warnings.' },
    { name: 'keywords', content: 'fanfiction, fanfic, read, story, online reading' }
  ]
})

const { getFanficById } = useFanfics()

const isLoading = ref(true)
const error = ref(false)
const fanfic = ref<Fanfic | null>(null)

// Load fanfic data
const loadFanfic = async () => {
  try {
    isLoading.value = true
    error.value = false

    const fanficData = await getFanficById(fanficId)
    fanfic.value = fanficData

    // Update page title with fanfic title
    useHead({
      title: `${fanficData.title} - Fanstore`,
      meta: [
        { name: 'description', content: fanficData.summary.substring(0, 160) + '...' },
        { name: 'keywords', content: `fanfiction, ${fanficData.fandoms.map(f => f.name).join(', ')}, ${fanficData.tags.map(t => t.name).join(', ')}` }
      ]
    })
  } catch (err) {
    console.error('Error loading fanfic:', err)
    error.value = true
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  // Navigate back or to search page
  if (history.length > 1) {
    history.back()
  } else {
    navigateTo('/search')
  }
}

const openExternalFanfic = () => {
  if (fanfic.value?.external && fanfic.value?.url) {
    window.open(fanfic.value.url, '_blank')
  }
}

const addToLibrary = () => {
  // TODO: Implement add to library functionality
  console.log('Add to library clicked')
}

const shareFanfic = () => {
  // TODO: Implement share functionality
  if (navigator.share) {
    navigator.share({
      title: fanfic.value?.title,
      text: fanfic.value?.summary,
      url: window.location.href,
    })
  } else {
    // Fallback: copy URL to clipboard
    navigator.clipboard.writeText(window.location.href)
    // TODO: Show toast notification
    console.log('URL copied to clipboard')
  }
}

const reportIssue = () => {
  // TODO: Implement report functionality
  console.log('Report issue clicked')
}

// Load data on mount
onMounted(loadFanfic)
</script>
