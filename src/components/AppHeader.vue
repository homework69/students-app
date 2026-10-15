<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const links = [
  { label: 'Все ученики', to: '/', icon: '▦' },
  { label: '17:00', to: '/time/17-00', icon: '◷' },
  { label: '18:00', to: '/time/18-00', icon: '◷' },
  { label: '20:00', to: '/time/20-00', icon: '◷' },
]
</script>

<template>
  <header class="topbar">
    <RouterLink to="/" class="brand">
      <span class="brand-mark">У</span>
      <span><strong>Ученики</strong><small>Управление расписанием</small></span>
    </RouterLink>
    <nav class="main-nav" aria-label="Основная навигация">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="nav-link"
        :class="{ active: route.path === link.to }"
      >
        <span class="nav-icon">{{ link.icon }}</span>{{ link.label }}
      </RouterLink>
    </nav>
  </header>
</template>
