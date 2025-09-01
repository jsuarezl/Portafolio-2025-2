
<template>
  <div class="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden flex flex-col h-full">
    <!-- Header -->
    <div v-if="$slots.header" class="flex-shrink-0">
      <slot name="header" />
    </div>

    <!-- Content -->
    <div v-if="$slots.content" class="flex-grow overflow-y-auto">
      <slot name="content" />
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="flex-shrink-0 mt-auto">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
// No props needed for this generic card component
</script>
