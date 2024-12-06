<script>
import { ref, onMounted } from "vue";
import apiClient from "@/axios"; // Axios設定をインポート

export default {
  setup() {
    // 選択状態を管理する変数
    const selectedPrefecture = ref("");
    const selectedArea = ref("");
    const selectedStatus = ref("");

    // 都道府県と活動エリアのリスト
    const prefectures = ref([]);
    const areas = ref(["活動エリア▼", "道路", "山", "川", "海", "公園", "その他"]);

    // 都道府県データを取得する関数
    const fetchPrefectures = async () => {
      try {
        // `/prefectures` APIエンドポイントからデータを取得
        const response = await apiClient.get("/prefectures");
        prefectures.value = response.data; // データを`prefectures`に格納
      } catch (error) {
        console.error("都道府県データの取得に失敗しました:", error);
      }
    };

    // `List.vue` にクエリ付きで遷移する関数
    const navigateToList = () => {
      const query = {
        prefecture: selectedPrefecture.value || null,
        area: selectedArea.value || null,
        status: selectedStatus.value || null,
      };

      // Vue Routerを使ってページ遷移
      this.$router.push({ name: "List", query });
    };

    // コンポーネントがマウントされた時に都道府県を取得
    onMounted(() => {
      fetchPrefectures();
    });

    return {
      selectedPrefecture,
      selectedArea,
      selectedStatus,
      prefectures,
      areas,
      navigateToList,
    };
  },
};
</script>

<template>
  <div class="search-container">
    <div class="search-row">
      <!-- 都道府県プルダウン -->
      <div class="search-item">
        <select id="prefecture" v-model="selectedPrefecture">
          <option value="" disabled selected hidden>都道府県▼</option>
          <option v-for="pref in prefectures" :key="pref.id" :value="pref.name">
            {{ pref.name }}
          </option>
        </select>
      </div>

      <!-- 活動エリアプルダウン -->
      <div class="search-item">
        <select id="area" v-model="selectedArea">
          <option value="" disabled selected hidden>活動エリア▼</option>
          <option v-for="(area, index) in areas" :key="index" :value="area">
            {{ area }}
          </option>
        </select>
      </div>

      <!-- 募集状況プルダウン -->
      <div class="search-item">
        <select id="status" v-model="selectedStatus">
          <option value="" disabled selected hidden>募集状況▼</option>
          <option value="募集中">募集中</option>
          <option value="募集終了">募集終了</option>
          <option value="すべて">すべて</option>
        </select>
      </div>

      <!-- 検索ボタン -->
      <div class="search-item">
        <button @click="navigateToList">検索</button>
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
  justify-content:space-around;
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
  border: 1px solid #ccc;
  border-radius: 4px;
  color: rgb(255, 255, 255);
  /* テキスト色を白にする */
  appearance: none;
  /* ブラウザのデフォルトスタイルを無効化 */
  font-size: 25px;
  text-align: center;
  box-shadow: 2px 2px #ccc;
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
  box-shadow: 2px 2px #ccc;

}

.search-item button:hover {
  background-color: #ff8c00;
}
</style>
