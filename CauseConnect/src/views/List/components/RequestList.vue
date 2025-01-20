<script setup>
import { ref, computed, defineProps } from "vue";
import RequestItem from "./RequestItem.vue"; // RequestItem コンポーネントをインポート

// 親コンポーネントから `requests` を受け取る
const props = defineProps({
  requests: {
    type: Array,
    required: true,
  },
});

// 表示するリクエストの数（最初は5件）
const displayCount = ref(5);

// 現在表示するリスト（displayCount の数だけ表示）
const visibleRequests = computed(() => props.requests.slice(0, displayCount.value));

// 「もっと見る」ボタンの動作
const loadMore = () => {
  displayCount.value += 5; // 次の5件を追加
};
</script>

<template>
  <div class="request-list">
    <!-- リストが空の場合のメッセージ -->
    <div v-if="visibleRequests.length === 0" class="no-requests">
      現在、表示できる依頼はありません。
    </div>

    <!-- リストがある場合は表示 -->
    <div v-else>
      <div v-for="request in visibleRequests" :key="request.id">
        <RequestItem :request="request" />
      </div>

      <!-- もっと見るボタン（すべて表示されていない場合のみ表示） -->
      <button v-if="displayCount < props.requests.length" @click="loadMore" class="load-more">
        もっと見る
      </button>
    </div>
  </div>
</template>

<style scoped>
.request-list {
  margin-left: 20px;
  margin-right: -0px;
}
.request-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.request-item:hover {
  transform: translateX(-10px) scale(1.05); /* 左に移動して拡大 */
  background-color: #ffeacf;
  border: 5px solid #ff8c00;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 影をつけて強調 */
}

/* もっと見るボタンのスタイル */
.load-more {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #ff8c00;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.load-more:hover {
  background-color: #e67e00;
}
</style>
