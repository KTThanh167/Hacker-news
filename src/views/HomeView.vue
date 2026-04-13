<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import http from '@/utils/axios-req'
import TheHeader from '@/components/Layout/TheHeader.vue'
import PaginationSession from '@/components/Layout/PaginationSession.vue'

// Định nghĩa Interface (Nên để trên cùng)
interface NewsItem {
  id: number
  title: string
  points: number | null
  user: string | null
  time: number
  time_ago: string
  comments_count: number
  type: string
  url: string
  domain?: string
}

const newsList = ref<NewsItem[]>([])
const page = ref(1)
const isLoading = ref(false)

const fetchHackerNews = async () => {
  isLoading.value = true
  try {
    const data = await http.get<unknown, NewsItem[]>('/feeds', {
      params: {
        feed: 'news',
        page: page.value + 1,
      },
    })

    // Vì Interceptor đã gọt vỏ, data bây giờ chính là mảng tin tức
    newsList.value = data
    console.log('Dữ liệu nhận được:', newsList.value)
  } catch (error) {
    console.error('Đã có lỗi xảy ra:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchHackerNews)
watch(page, fetchHackerNews)
</script>

<template>
  <TheHeader />
  <div class="container">
    <div class="flex items-center">
      <PaginationSession
        :currentPage="page"
        :totalPage="10"
        @changePage="(val: number) => (page = val)"
      />
    </div>

    <div v-if="isLoading" class="p-4 text-orange-500 font-bold flex items-center gap-2">
      <span class="animate-spin text-xl">↻</span> Đang tải tin tức...
    </div>

    <ul v-else class="p-4 divide-y divide-gray-200">
      <li v-for="item in newsList" :key="item.id" class="py-3">
        <a
          :href="item.url"
          target="_blank"
          class="text-blue-700 font-semibold hover:underline block mb-1"
        >
          {{ item.title }}
        </a>
        <div class="text-xs text-gray-500 flex items-center gap-2">
          <span>{{ item.points ?? 0 }} points</span>
          <span>|</span>
          <span
            >bởi <strong>{{ item.user || 'N/A' }}</strong></span
          >
          <span>|</span>
          <span>{{ item.time_ago }}</span>
          <span>|</span>
          <span class="hover:text-orange-600 cursor-pointer">
            {{ item.comments_count }} bình luận
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
