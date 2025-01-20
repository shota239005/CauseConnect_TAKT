<script setup>
import { ref, onMounted, defineEmits } from "vue";
import apiClient from "@/axios";
import { useRouter } from "vue-router";

const emit = defineEmits(["update-results"]);
const router = useRouter();

const selectedPrefecture = ref("");
const selectedArea = ref("");
const selectedStatus = ref("");

const prefectures = ref([]);
const areas = ref([]);
const searchResults = ref([]);

// 都道府県データを取得
const fetchPrefectures = async () => {
  const cachedPrefectures = localStorage.getItem("prefectures");
  if (cachedPrefectures) {
    prefectures.value = JSON.parse(cachedPrefectures);
    return;
  }

  try {
    const response = await apiClient.get("/prefectures");
    prefectures.value = response.data;
    localStorage.setItem("prefectures", JSON.stringify(prefectures.value)); // キャッシュに保存
  } catch (error) {
    console.error("都道府県データの取得に失敗しました:", error);
  }
};

// 活動エリアデータを取得
const fetchAreas = async () => {
  const cachedAreas = localStorage.getItem("areas");
  if (cachedAreas) {
    areas.value = JSON.parse(cachedAreas);
    return;
  }

  try {
    const response = await apiClient.get("/places");
    areas.value = response.data;
    localStorage.setItem("areas", JSON.stringify(areas.value)); // キャッシュに保存
  } catch (error) {
    console.error("活動エリアデータの取得に失敗しました:", error);
  }
};

// 検索処理
const searchPosts = async () => {
  try {
    searchResults.value = [];
    emit("update-results", []);

    const params = {};
    if (selectedPrefecture.value) params.pref_id = selectedPrefecture.value;
    if (selectedArea.value) params.area_id = selectedArea.value;
    if (selectedStatus.value) params.status = selectedStatus.value;

    const response = await apiClient.get("/search-posts", { params });
    searchResults.value = response.data;
    emit("update-results", searchResults.value);

    router.push({
      path: "/list",
      query: { results: JSON.stringify(searchResults.value) },
    });
  } catch (error) {
    console.error("検索処理中にエラーが発生しました:", error);
  }
};

// コンポーネントがマウントされた時にデータを取得
onMounted(() => {
  fetchPrefectures();
  fetchAreas();
});
</script>

<template>
  <div class="search-container">
    <div class="search-row">

      <!-- 都道府県プルダウン -->
      <div class="search-item">
        <select id="prefecture" v-model="selectedPrefecture">
          <option value="" disabled>都道府県▼</option>
          <option v-for="pref in prefectures" :key="pref.pref_id" :value="pref.pref_id">
            {{ pref.pref }}
          </option>
        </select>
      </div>

      <!-- 活動エリアプルダウン -->
      <div class="search-item">
        <select id="area" v-model="selectedArea">
          <option value="" disabled>活動エリア▼</option>
          <option v-for="area in areas" :key="area.area_id" :value="area.area_id">
            {{ area.area }}
          </option>
        </select>
      </div>

      <!-- 募集状況プルダウン -->
      <div class="search-item">
        <select id="status" v-model="selectedStatus">
          <option value="" disabled>募集状況▼</option>
          <option value="1">募集中</option>
          <option value="2">募集終了</option>
        </select>
      </div>

      <!-- 検索ボタン -->
      <div class="search-item">
        <button @click="searchPosts">検索</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  max-width: 1000px;
  margin: 100px auto;
  padding: 20px;
  /*border: 1px solid #ccc;*/
  border-radius: 8px;
}

.search-container h2 {
  margin-bottom: 20px;
}

.search-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
}

.search-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-item select {
  font-family: "Zen Maru Gothic", serif;
  width: 200px;
  padding: 0.5rem;
  background-color: #f7a400;
  /* プルダウン内の背景をオレンジ色に設定 */
  border: 1px solid #f7a400;
  border-radius: 4px;
  color: rgb(255, 255, 255);
  /* テキスト色を白にする */
  appearance: none;
  /* ブラウザのデフォルトスタイルを無効化 */
  font-size: 25px;
  text-align: center;
  box-shadow: 2px 2px #ff8c00;
}

.search-item select option {
  background-color: #f7dfb0f3;
  /* プルダウン項目の背景をオレンジ色に設定 */
  color: rgb(61, 61, 61);
  /* 項目のテキスト色を白にする */
}

.search-item button {
  font-family: "Zen Maru Gothic", serif;
  width: 150px;
  padding: 0.75rem;
  background-color: #f7a400;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 25px;
  text-align: center;
  box-shadow: 2px 2px #ff8c00;

}

.search-item button:hover {
  background-color: #ff8c00;
}
</style>
