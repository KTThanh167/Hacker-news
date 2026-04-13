<script setup lang="ts">
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'

// Props hoặc Ref nhận từ component cha
const props = defineProps<{
  currentPage: number
  totalPage: number
}>()

const emit = defineEmits(['changePage'])

const handlePrev = () => {
  if (props.currentPage > 1) emit('changePage', props.currentPage - 1)
}

const handleNext = () => {
  if (props.currentPage < props.totalPage) emit('changePage', props.currentPage + 1)
}
</script>

<template>
  <div class="flex items-center justify-center gap-8 py-6 bg-white select-none">
    <a-button type="link" @click="handlePrev" :disabled="currentPage <= 1" class="pagination-btn">
      <template #icon><LeftOutlined /></template>
      <span class="ml-1">prev</span>
    </a-button>

    <div class="flex items-center text-gray-400 font-light">
      <span class="text-black font-normal mr-1">{{ currentPage }}</span>
      <span class="mx-2">/</span>
      <span>{{ totalPage }}</span>
    </div>

    <a-button
      type="link"
      @click="handleNext"
      :disabled="currentPage >= totalPage"
      class="pagination-btn"
    >
      <span class="mr-1">more</span>
      <template #icon><RightOutlined /></template>
    </a-button>
  </div>
</template>

<style scoped>
/* Tùy chỉnh màu sắc Ant Design để giống bản mẫu */
.pagination-btn {
  @apply text-gray-500 hover:text-black flex items-center p-0 h-auto;
}

/* Ghi đè màu của Ant Design khi disabled */
:deep(.ant-btn-link:disabled) {
  @apply text-gray-300;
}

/* Chỉnh kích thước icon nhỏ lại cho tinh tế */
.anticon {
  font-size: 10px;
}
</style>
