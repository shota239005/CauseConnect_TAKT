<script setup>
import RequestList from "./components/RequestList.vue"; // RequestListコンポーネントをインポート
import Refine from "./components/Refine.vue"; // フィルターコンポーネントをインポート
import search from "@/components/search.vue";
import { ref } from "vue";

// ローディング状態を管理
const loading = ref(false);

// フィルター条件を保持するリアクティブなオブジェクト
const filters = ref({
  keyword: "",
  location: "",
  date: "",
});

// フィルタリング処理をモック化
const applyFilters = (newFilters) => {
  loading.value = true;
  setTimeout(() => {
    filters.value = { ...newFilters }; // 新しいフィルター条件を適用
    loading.value = false; // ローディングを終了
  }, 500); // ローディング遅延を模擬
};

// フィルターのリセット
const resetFilters = () => {
  filters.value = {
    keyword: "",
    location: "",
    date: "",
  };
};
</script>

<template>
  <search/>
  <div class="list-page">
    <div class="list-container">
      <!-- 左側: フィルター -->
      <div class="refine-sidebar">
        <Refine @apply-filters="applyFilters" />
        <button class="btn1" @click="resetFilters">条件をリセット</button>
      </div>

      <!-- 右側: 依頼リスト -->
      <div class="list-content">
        <h1>依頼一覧</h1>

        <!-- ローディングスピナー -->
        <div v-if="loading" class="loading-spinner">
          <p>ロード中...</p>
        </div>

        <!-- フィルタリング条件がない場合のメッセージ -->
        <p v-if="!loading && !filters.keyword && !filters.location && !filters.date" class="no-filters">
          条件を入力して依頼を絞り込んでください。
        </p>

        <!-- フィルター適用後の依頼リスト -->
        <RequestList v-if="!loading" :filters="filters" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-container{
  width: 50%;
  margin-right: 190px;
  margin-top: 10px;
  margin-bottom: 0%;
  padding: 0%;
}
.btn1{
  color: #333;
}

.list-container {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.refine-sidebar {
  width: 300px;
  flex-shrink: 0;
}


.list-content {
  flex-grow: 1;
  padding-left: 20px;
}

h1 {
  font-size: 24px;
}

.loading-spinner {
  font-size: 18px;
  color: #999;
  text-align: center;
  margin: 20px 0;
}

.no-filters {
  font-size: 16px;
  color: #999;
  text-align: center;
}

</style>
