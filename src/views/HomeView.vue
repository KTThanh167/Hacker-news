<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import http from '@/utils/axios-req'
import TheHeader from '@/components/Layout/TheHeader.vue'
import PaginationSession from '@/components/Layout/PaginationSession.vue'
import { timeAgo } from '@/utils/time'

// Định nghĩa Interface
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
  <!-- Header -->
  <div class="w-full">
    <TheHeader />
  </div>
  <!-- Body -->
  <div class="max-w-4xl container flex flex-col items-center">
    <!-- Phân trang -->
    <div class="flex items-center self-center">
      <PaginationSession
        :currentPage="page"
        :totalPage="10"
        @changePage="(val: number) => (page = val)"
      />
    </div>
    <!-- Loading -->
    <div v-if="isLoading" class="p-4 text-orange-500 font-bold flex items-center gap-2">
      <span class="animate-spin text-xl">↻</span> Đang tải tin tức...
    </div>
    <!-- Content -->
    <ul v-else class="p-4 divide-y divide-gray-200">
      <li v-for="item in newsList" :key="item.id" class="py-3 flex items-center gap-7">
        <div class="font-bold text-[#2e495e] min-w-[30px]">{{ item.points }}</div>
        <div>
          <a
            :href="item.url"
            target="_blank"
            class="text-blue-700 font-semibold hover:underline block mb-1"
          >
            {{ item.title }}
          </a>
          <div class="text-xs text-gray-500 flex items-center gap-2">
            <span>by</span>
            <span class="hover:text-primary cursor-pointer">{{ item.user || 'N/A' }}</span>
            <span>{{ timeAgo(item.time) }}</span>
            <span>|</span>
            <span class="hover:text-primary cursor-pointer">
              {{ item.comments_count }} bình luận
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
