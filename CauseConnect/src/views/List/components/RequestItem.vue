<script setup>
// 受け取るプロパティを定義
defineProps({
  request: {
    type: Object,
    required: true,
  },
});

// FavoriteIcon をインポート
import FavoriteIcon from "@/components/FavoriteIcon.vue";
</script>

<template>
  <div class="request-item">
    <!-- お気に入りアイコンを右上に配置 -->
    <FavoriteIcon class="favorite-icon" />

    <!-- 左側に画像の仮枠を表示 -->
    <div class="request-image">
      <!-- 仮の枠（画像がない場合） -->
      <div class="image-placeholder">画像なし</div>
    </div>

    <!-- 右側に依頼情報を表示 -->
    <div class="request-info">
      <h3>{{ request.name }}</h3>

      <p><strong>日付:</strong> {{ request.date }}</p>
      <p><strong>場所:</strong> {{ request.location }}</p>
      <p><strong>活動内容:</strong> {{ request.description }}</p>

      <!-- 詳細ページへのリンク -->
      <router-link :to="`/details/${request.id}`" class="details-link">詳細を見る</router-link>
    </div>
  </div>
</template>

<style scoped>
.request-item {
  display: flex;
  gap: 20px; /* 画像と情報の間にスペースを追加 */
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  position: relative; /* お気に入りアイコンを配置するため */
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* 画像部分のスタイル（仮枠） */
.request-image {
  width: 200px; /* 画像の幅 */
  height: 150px; /* 画像の高さ */
  background-color: #ccc; /* グレーの背景 */
  border-radius: 5px; /* 角を丸く */
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-placeholder {
  color: white;
  font-size: 16px;
  font-weight: bold;
}

/* 依頼情報部分のスタイル */
.request-info {
  flex-grow: 1; /* 残りのスペースを占める */
}

.request-info h3 {
  margin: 0 0 10px;
  font-size: 20px;
  color: #333;
}

.request-info p {
  margin: 5px 0;
  font-size: 14px;
}

.details-link {
  display: inline-block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
}

.details-link:hover {
  text-decoration: underline;
}
</style>
