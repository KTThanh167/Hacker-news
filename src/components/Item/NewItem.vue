<script setup lang="ts">
import { computed } from 'vue'
import { timeAgo } from '@/utils/time'

const props = defineProps<{
  item: {
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
}>()

const formattedTime = computed(() => {
  return timeAgo(props.item.time)
})
</script>

<template>
  <li class="py-3 flex items-center gap-7">
    <div class="font-bold text-[#2e495e] min-w-[30px] text-right">{{ item.points }}</div>
    <div>
      <a
        :href="item.url as string"
        target="_blank"
        class="text-blue-700 font-semibold hover:underline block mb-1"
      >
        {{ item.title }}
      </a>
      <div class="text-xs text-gray-500 flex items-center gap-2">
        <span>by {{ item.user }}</span>
        <span>{{ formattedTime }}</span>
        <span>| {{ item.comments_count }} bình luận</span>
      </div>
    </div>
  </li>
</template>
