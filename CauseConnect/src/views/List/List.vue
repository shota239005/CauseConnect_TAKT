<script setup>
import RequestList from "./components/RequestList.vue"; // RequestListコンポーネントをインポート
import Refine from "./components/Refine.vue"; // フィルターコンポーネントをインポート
import search from "@/components/search.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router"; 

// ローディング状態を管理
const loading = ref(false);

// フィルター条件を保持するリアクティブなオブジェクト
const filters = ref({
  keyword: "",
  location: "",
  date: "",
});

// 受け取った検索結果を保持する
const searchResults = ref([]);
// ルート情報を取得
const route = useRoute();

// クエリパラメータから検索結果を取得して初期化
onMounted(() => {
  if (route.query.results) {
    try {
      searchResults.value = JSON.parse(route.query.results); // クエリから受け取った結果をパース
    } catch (error) {
      console.error("検索結果のパースに失敗しました:", error);
      searchResults.value = []; // パース失敗時は空配列を設定
    }
  }
});

// 子コンポーネント `Search.vue` からのイベントを受け取る
const updateResults = (results) => {
  console.log("List.vue:", results);
  searchResults.value = results;
};

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
  <div class="list-page">

    <!-- search.vue のコンポーネント -->
    <search @update-results="updateResults" />

    <div class="list-container">
      <!-- 左側: フィルター -->
      <div class="refine-sidebar">
        <Refine @apply-filters="applyFilters" />
        <button class="btn1" @click="resetFilters">条件をリセット</button>
      </div>

      <!-- 右側: 依頼リスト -->
      <div class="list-content">
        <h1>依頼一覧</h1>
        <RequestList :requests="searchResults" />

        <!-- ローディングスピナー -->
        <div v-if="loading" class="loading-spinner">
          <p>ロード中...</p>
        </div>

        <!-- フィルタリング条件がない場合のメッセージ -->
        <p v-if="!loading && !filters.keyword && !filters.location && !filters.date" class="no-filters">
          条件を入力して依頼を絞り込んでください。
        </p>

      </div>
    </div>
  </div>

</template>

<style scoped>
.search-container {
  width: 50%;
  margin-right: 190px;
  margin-top: 10px;
  margin-bottom: 0%;
  padding: 0%;
}

.btn1 {
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
