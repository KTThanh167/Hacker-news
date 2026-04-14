<script setup lang="ts">
import { useRouter } from 'vue-router'
import { MenuOutlined } from '@ant-design/icons-vue'

const router = useRouter()

const goToPath = (path: string) => {
  router.push(path)
}
</script>

<template>
  <!-- Menu chuyển trang -->
  <div>
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

      <a-float-button @click="goToPath('/jobs')">
        <template #description>Jobs</template>
      </a-float-button>
    </a-float-button-group>
  </div>
</template>
