<script setup lang="ts"></script>

<template>
  <header class="bg-[#020420]">
    <div class="max-w-4xl h-16 flex items-center container justify-around">
      <div class="flex gap-8 nav-links">
        <router-link to="/">News</router-link>
        <router-link to="/Newest">Newest</router-link>
        <router-link to="/Ask">Ask</router-link>
        <router-link to="/Show">Show</router-link>
        <router-link to="/Jobs">Jobs</router-link>
      </div>
      <div>
        <a href="https://github.com/nuxt/hackernews" class="text-white hover:text-green-300"
          >Open on Github</a
        >
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Class mặc định của Vue Router */
.nav-links a {
  @apply text-white hover:text-green-300 transition-colors;
}

/* Khi link đang active (đang ở trang đó) */
.nav-links .router-link-active {
  @apply text-green-400 font-medium border-b-2 border-green-400 pb-1;
}
</style>
