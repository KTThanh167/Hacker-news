<script setup lang="ts">
import { useRouter } from 'vue-router'
import { VerticalAlignTopOutlined, MenuOutlined } from '@ant-design/icons-vue'

const router = useRouter()

const goToPath = (path: string) => {
  router.push(path)
}

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

    <!-- Menu chuyển trang -->
    <a-float-button-group trigger="hover" type="primary" :style="{ right: '80px', bottom: '16px' }">
      <template #icon><MenuOutlined /></template>

      <a-float-button @click="goToPath('/news')">
        <template #description>News</template>
      </a-float-button>

      <a-float-button @click="goToPath('/newest')">
        <template #description>Newest</template>
      </a-float-button>

      <a-float-button @click="goToPath('/ask')">
        <template #description>Ask</template>
      </a-float-button>

      <a-float-button @click="goToPath('/show')">
        <template #description>Show</template>
      </a-float-button>

      <a-float-button @click="goToPath('/job')">
        <template #description>Jobs</template>
      </a-float-button>
    </a-float-button-group>
  </div>
</template>
