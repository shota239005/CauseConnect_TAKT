<script setup>
import { defineProps } from "vue";
import RequestItem from "./RequestItem.vue"; // RequestItem コンポーネントをインポート

// 親コンポーネントから `requests` を受け取る
const props = defineProps({
  requests: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="request-list">

    <!-- リストが空の場合のメッセージ -->
    <div v-if="requests.length === 0" class="no-requests">
      現在、表示できる依頼はありません。
    </div>

     <!-- リストがある場合は表示 -->
     <div v-else>
      <div v-for="request in requests" :key="request.id">
        <RequestItem :request="request" />
      </div>
    </div>
  
  </div>
</template>

<style scoped>
.request-list {
  margin-left: 20px;
  margin-right: -10px;
}
.request-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.request-item:hover {
  transform: translateX(-10px) scale(1.05); /* 左に移動して拡大 */
  background-color:#ffeacf;
  border: 5px solid #ff8c00;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 影をつけて強調 */
}

</style>
