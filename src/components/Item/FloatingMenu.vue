<script setup lang="ts">
import { VerticalAlignTopOutlined } from '@ant-design/icons-vue'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <!-- Nút cuộn lên đầu trang  -->
    <a-button
      type="primary"
      shape="circle"
      @click="scrollToTop"
      :style="{
        position: 'fixed',
        right: '16px',
        bottom: '16px',
        zIndex: 1000,
        padding: '0',
        width: '40px',
        height: '40px',
      }"
    >
      <template #icon><VerticalAlignTopOutlined /></template>
    </a-button>
  </div>
</template>
