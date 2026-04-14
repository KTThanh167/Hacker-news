<script setup lang="ts">
import TheHeader from '@/components/Layout/TheHeader.vue'
</script>

<template>
  <TheHeader />
  <router-view :key="$route.fullPath" />
</template>
