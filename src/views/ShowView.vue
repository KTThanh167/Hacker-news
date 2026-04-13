<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import http from '@/utils/axios-req'
import PaginationSession from '@/components/Layout/PaginationSession.vue'
import { useRoute, useRouter } from 'vue-router'
import NewItem from '@/components/Item/NewItem.vue'

const route = useRoute()
const router = useRouter()

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
        feed: 'show',
        page: page.value + 1,
      },
    })
    // Vì đã sử dụng Interceptor, data bây giờ chính là mảng tin tức
    newsList.value = data
    // Tự động cuộn lên đầu trang khi page thay đổi
    window.scrollTo({ top: 0, behavior: 'smooth' })
    console.log('Dữ liệu nhận được:', newsList.value)
  } catch (error) {
    console.error('Đã có lỗi xảy ra: ', error)
  } finally {
    isLoading.value = false
  }
}

//Hàm đồng bộ URL khi page thay đổi
const updateURL = () => {
  router.push({
    query: { ...route.query, page: page.value },
  })
}

//Hàm chuyển page bằng phím mũi tên
const HandleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowRight' && page.value < 10) {
    page.value++
  } else if (event.key === 'ArrowLeft' && page.value > 1) {
    page.value--
  }
}

onMounted(() => {
  //Lấy page từ URL, nếu không có thì mặc định là 1
  const pageFromQuerry = Number(route.query.page)
  if (pageFromQuerry && !isNaN(pageFromQuerry)) {
    page.value = pageFromQuerry
  }
  window.addEventListener('keydown', HandleKeydown)
  fetchHackerNews()
})

//Dọn dẹp sự kiện HandleKeydown khi component bị hủy
onUnmounted(() => {
  window.removeEventListener('keydown', HandleKeydown)
})

watch(page, () => {
  updateURL() //Cập nhật URL thành ?page=x
  fetchHackerNews()
})
</script>

<template>
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
      <span class="animate-spin text-xl">↻</span> Đang tải tin tức ...
    </div>
    <!-- Content -->
    <ul v-else class="p-4 divide-y divide-gray-200 shadow">
      <NewItem v-for="item in newsList" :key="item.id" :item="item" />
    </ul>
    <!-- Phân trang -->
    <div v-if="!isLoading" class="pt-4 flex items-center self-center">
      <PaginationSession
        :currentPage="page"
        :totalPage="10"
        @changePage="(val: number) => (page = val)"
      />
    </div>
  </div>
</template>
