<script>
export default {
  data() {
    return {
      filters: {
        keyword: "", // フリーワード
        status: [], // 募集状況（複数選択）
        area: [], // 活動エリア（複数選択）
        theme: [], // 活動テーマ（複数選択）
        age: [], // 推奨年齢（複数選択）
        feature: [], // 特徴（複数選択）
      },
      areas: ["道路", "山", "川", "海", "公園", "その他"],
      themes: ["地域美化"], // 活動テーマは「地域美化」のみ
    };
  },
  methods: {
    handleSearch() {
      console.log("検索条件:", this.filters);
      // ここでフィルタリング処理を実行することができます
      this.$emit('apply-filters', { ...this.filters });
    },
  },
};
</script>

<template>
  <div class="refine-container">
    <h1>詳細検索</h1>
    <form @submit.prevent="handleSearch">
      <!-- フリーワード -->
      <div class="form-group">
        <label for="keyword">フリーワード</label>
        <input type="text" id="keyword" v-model="filters.keyword" placeholder="例: ゴミ拾い" />
        <!--フリーワードのみの検索-->
        <button type="submit" class="btn1">検索</button>
      </div>

      <!-- 募集状況 -->
      <div class="form-group">
        <label for="status">募集状況</label>
        <div>
          <label>
            <input type="checkbox" value="募集中" v-model="filters.status" /> 募集中
          </label>
          <label>
            <input type="checkbox" value="募集終了" v-model="filters.status" /> 募集終了
          </label>
        </div>
      </div>

      <!-- 活動エリア -->
      <div class="form-group">
        <label>活動エリア</label>
        <div>
          <label v-for="(area, index) in areas" :key="index">
            <input type="checkbox" :value="area" v-model="filters.area" /> {{ area }}
          </label>
        </div>
      </div>

      <!-- 活動テーマ -->
      <div class="form-group">
        <label>活動テーマ</label>
        <div>
          <label>
            <input type="checkbox" value="地域美化" v-model="filters.theme" /> 地域美化
          </label>
        </div>
      </div>

      <!-- 推奨年齢 -->
      <div class="form-group">
        <label>推奨年齢</label>
        <div>
          <label>
            <input type="checkbox" value="全年齢" v-model="filters.age" /> 全年齢
          </label>
          <label>
            <input type="checkbox" value="シニア" v-model="filters.age" /> シニア
          </label>
          <label>
            <input type="checkbox" value="社会人" v-model="filters.age" /> 社会人
          </label>
          <label>
            <input type="checkbox" value="学生" v-model="filters.age" /> 学生
          </label>
          <label>
            <input type="checkbox" value="その他" v-model="filters.age" /> その他
          </label>
        </div>
      </div>

      <!-- 特徴 -->
      <div class="form-group">
        <label>特徴</label>
        <div>
          <label>
            <input type="checkbox" value="親子で参加できる" v-model="filters.feature" /> 親子で参加できる
          </label>
          <label>
            <input type="checkbox" value="初心者歓迎" v-model="filters.feature" /> 初心者歓迎
          </label>
          <label>
            <input type="checkbox" value="体力に自信がある" v-model="filters.feature" /> 体力に自信がある
          </label>
        </div>
      </div>
      <!--チェックボックスの検索-->
      <button type="submit" class="btn1">検索</button>
    </form>
  </div>
</template>

<style scoped>
.refine-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ffca5f;

}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input[type="text"],
select {
  font-family: "Zen Maru Gothic", serif;
  width: 60%;
  padding: 8px;
  border: 2px solid #333;
  border-radius: 4px;
  margin-right: 7px;
}

input[type="checkbox"] {
  margin-right: 5px;
}

.btn1 {
  margin-top: 5px;
  background-color: #fff;
  color: #333;
  border: 2px solid;
  border-color: #ff8c00;
  padding: 5px 20px;
  cursor: pointer;
  border-radius: 4px;
}

.search-button:hover {
  background-color: #616161;
}
</style>
