<script setup>
// 受け取るプロパティを定義
defineProps({
  request: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="image-slide-item">
    <!-- 仮画像枠 -->
    <div class="image-container">
      <!-- 仮画像が必要な場合はここにプレースホルダー画像を表示 -->
      <div class="placeholder-image">
        <span>画像が準備できていません</span>
      </div>
    </div>

    <!-- タイトルと場所 -->
    <div class="info-container">
      <h3>{{ request.name }}</h3>
      <p><strong>場所:</strong> {{ request.location }}</p>
    </div>
  </div>
</template>

<style scoped>
.image-slide-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin: 20px;
}

/* 仮画像枠のスタイル */
.image-container {
  width: 100%;
  height: 100px; /* 高さを調整 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc; /* グレーの背景色 */
  margin-bottom: 15px;
}

.placeholder-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}

.info-container {
  text-align: center;
}

h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #333;

}

p {
  font-size: 14px;
  margin-top: 5px;
}

</style>
