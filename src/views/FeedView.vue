<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted, computed } from 'vue'
import http from '@/utils/axios-req'
import PaginationSession from '@/components/Layout/PaginationSession.vue'
import { useRoute, useRouter } from 'vue-router'
import NewItem from '@/components/Item/NewItem.vue'
import FloatingMenu from '@/components/Item/FloatingMenu.vue'
import ScrollToTop from '@/components/Item/ScrollToTop.vue'

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

// Nhận tham số từ URL (news, newest, ask, show, jobs)
// Mặc định là 'news' nếu trang chủ
const feedType = ref(route.params.type || 'news')
const page = ref(Number(route.query.page) || 1)
const newsList = ref<NewsItem[]>([])
const isLoading = ref(false)

const fetchHackerNews = async () => {
  isLoading.value = true
  try {
    // 1. Kiểm tra logic tên loại tin tức (ví dụ đổi 'job' thành 'jobs' cho đúng API)
    let type = feedType.value
    if (type === 'job') type = 'jobs'

    // 2. Gọi API (Bỏ dấu / ở đầu vì baseURL đã có thể xử lý hoặc để chắc chắn hơn)
    const data = await http.get<unknown, NewsItem[]>(`${type}/${page.value}.json`)

    newsList.value = data
    window.scrollTo({ top: 0, behavior: 'smooth' })
    console.log('Check data:', data) // Thêm dòng này để kiểm tra ở Console F12
  } catch (error) {
    console.error('Lỗi fetch:', error)
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

// Hàm chuyển page bằng phím mũi tên
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowRight' && page.value < 10) {
    page.value++
  } else if (event.key === 'ArrowLeft' && page.value > 1) {
    page.value--
  }
}

const maxPage = computed(() => {
  return 10
})

// Theo dõi sự thay đổi của URL (khi nhấn Menu)
watch(
  () => route.params.type,
  (newType) => {
    if (newType) {
      feedType.value = newType as string
      page.value = 1 // Reset về trang 1 khi đổi thể loại
      fetchHackerNews()
    }
  },
)

// Theo dõi sự thay đổi của số trang
watch(page, () => {
  updateURL() // Cập nhật URL thành ?page=x
  fetchHackerNews()
})

onMounted(() => {
  // Lấy page từ URL, nếu không có thì mặc định là 1
  const pageFromQuery = Number(route.query.page)
  if (pageFromQuery && !isNaN(pageFromQuery)) {
    page.value = pageFromQuery
  }
  window.addEventListener('keydown', handleKeydown)
  fetchHackerNews()
})

// Dọn dẹp sự kiện khi component bị hủy
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <!-- Body -->
  <div class="max-w-4xl container flex flex-col items-center">
    <!-- Phân trang -->
    <div class="flex items-center self-center">
      <PaginationSession
        :currentPage="page"
        :totalPage="maxPage"
        @changePage="(val: number) => (page = val)"
      />
    </div>
    <!-- Loading -->
    <div
      v-if="isLoading"
      class="w-full max-w-2xl p-4 bg-white shadow mt-4 divide-y divide-gray-100 flex flex-col gap-4"
    >
      <a-spin />
      <div v-for="i in 10" :key="i" class="py-5">
        <a-skeleton active :title="{ width: '80%' }" :paragraph="{ rows: 1, width: '40%' }" />
      </div>
    </div>
    <!-- Trang trống không có dữ liệu -->
    <div
      v-else-if="newsList.length === 0"
      class="w-full py-20 bg-white shadow mt-4 flex justify-center"
    >
      <a-empty description="Không tìm thấy tin tức nào" />
    </div>
    <!-- Content -->
    <ul v-else class="p-4 divide-y divide-gray-200 shadow">
      <NewItem v-for="item in newsList" :key="item.id" :item="item" />
    </ul>
    <!-- Cuộn lên đầu trang và menu chuyển trang nhanh -->
    <div>
      <FloatingMenu />
      <ScrollToTop />
    </div>
    <!-- Phân trang -->
    <div v-if="!isLoading && newsList.length > 0" class="pt-4 flex items-center self-center">
      <PaginationSession
        :currentPage="page"
        :totalPage="10"
        @changePage="(val: number) => (page = val)"
      />
    </div>
  </div>
</template>
