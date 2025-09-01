<template>
  <header class="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <i class="pi pi-book text-blue-600"></i>
            <span class="text-xl font-bold text-gray-900 dark:text-white">
              Fanstore
            </span>
          </NuxtLink>
        </div>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink
            to="/"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20': $route.path === '/' }"
          >
            <i class="pi pi-home w-4 h-4 mr-1 inline"></i>
            Inicio
          </NuxtLink>
          <NuxtLink
            to="/search"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20': $route.path === '/search' }"
          >
            <i class="pi pi-search w-4 h-4 mr-1 inline"></i>
            Buscar
          </NuxtLink>
          <NuxtLink
            to="/libraries"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20': $route.path.startsWith('/libraries') }"
          >
            <i class="pi pi-bookmark w-4 h-4 mr-1 inline"></i>
            Bibliotecas
          </NuxtLink>
          <NuxtLink
            to="/forums"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20': $route.path.startsWith('/forums') }"
          >
            <i class="pi pi-comments w-4 h-4 mr-1 inline"></i>
            Foros
          </NuxtLink>
        </nav>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Color Mode Toggle -->
          <Button
            :icon="colorMode.preference === 'dark' ? 'pi pi-sun' : 'pi pi-moon'"
            text
            rounded
            :aria-label="`Cambiar a modo ${colorMode.preference === 'dark' ? 'claro' : 'oscuro'}`"
            class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            @click="toggleColorMode"
          />

          <!-- Login/Register Button -->
          <Button
            label="Iniciar Sesión"
            icon="pi pi-sign-in"
            outlined
            aria-label="Iniciar Sesión o Registrarse"
            class="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-400 dark:hover:border-blue-400"
            @click="handleLogin"
          />

          <!-- Mobile Menu Button -->
          <Button
            :icon="mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"
            text
            rounded
            aria-label="Alternar menú móvil"
            class="md:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            @click="toggleMobileMenu"
          />
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
        <nav class="flex flex-col space-y-2">
          <NuxtLink
            to="/"
            class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20': $route.path === '/' }"
            @click="closeMobileMenu"
          >
            <i class="pi pi-home w-4 h-4 mr-2"></i>
            Inicio
          </NuxtLink>
          <NuxtLink
            to="/search"
            class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20': $route.path === '/search' }"
            @click="closeMobileMenu"
          >
            <i class="pi pi-search w-4 h-4 mr-2"></i>
            Buscar
          </NuxtLink>
          <NuxtLink
            to="/libraries"
            class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20': $route.path.startsWith('/libraries') }"
            @click="closeMobileMenu"
          >
            <i class="pi pi-bookmark w-4 h-4 mr-2"></i>
            Bibliotecas
          </NuxtLink>
          <NuxtLink
            to="/forums"
            class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20': $route.path.startsWith('/forums') }"
            @click="closeMobileMenu"
          >
            <i class="pi pi-comments w-4 h-4 mr-2"></i>
            Foros
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const mobileMenuOpen = ref(false)

const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const handleLogin = () => {
  // TODO: Implement login/register functionality
  console.log('Login clicked')
}

// Close mobile menu when route changes
watch(() => useRoute().path, () => {
  closeMobileMenu()
})

// Close mobile menu when clicking outside (optional enhancement)
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    const header = document.querySelector('header')
    if (header && !header.contains(event.target as Node)) {
      closeMobileMenu()
    }
  }

  document.addEventListener('click', handleClickOutside)

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>
