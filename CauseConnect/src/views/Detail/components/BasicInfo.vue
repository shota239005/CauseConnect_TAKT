<script setup>
import Map from '@/components/Map.vue';
import Home from '@/views/home/home.vue';
// 仮のモックデータ
const request = {
  requestName: '地域美化活動',
  activityDate: '2024-12-01',
  startTime: '9',
  endTime: '15',
  prefecture: '東京都',
  address1: '渋谷区',
  address2: '代々木公園',
  equipmentNeeded: '無',
  basicInfo: '地域の公園を掃除して、美化を促進します。',
  requestDetails: '参加者全員で代々木公園のゴミ拾いを行います。手袋は各自持参してください。',
};
</script>

<template>
  <div class="basic-info">
    <h2>基本情報</h2>

    <!-- 仮の画像枠 -->
    <div class="image-container">
      <div class="image-placeholder">画像をここに表示</div>
    </div>

    <!-- モックデータを表示 -->
    <div class="info">
      <p><strong>依頼名：</strong>{{ request.requestName }}</p>
      <p><strong>活動日：</strong>{{ request.activityDate }}</p>
      <p>
        <strong>活動時間：</strong>{{ request.startTime }}時～
        {{ request.endTime }}時
      </p>
      <p>
        <strong>場所：</strong>{{ request.prefecture }} {{ request.address1 }}
        {{ request.address2 }}
      </p>
      <p><strong>必要備品：</strong>{{ request.equipmentNeeded }}</p>
      <p><strong>活動目的：</strong>{{ request.basicInfo }}</p>
      <p><strong>依頼詳細：</strong>{{ request.requestDetails }}</p>
    </div>
        <!-- 仮の画像枠 -->
        <div class="image-container">
      <div class="image-placeholder">画像をここに表示</div>
    </div>
    <Map/>
    <div class="button-container">
      <RouterLink to="/">
      <button class="syusshi" >出資者で参加</button>
      </RouterLink>
      <p>どちらで参加しますか？</p>
      <RouterLink to="/">
        <button class="jikko" id="jiko" @click="Home">実行者で参加</button>
      </RouterLink>
    </div>

  </div>
</template>

<style scoped>
.basic-info {
  margin-left: -25px;/*左寄せを強制的にしてます */
  padding: 15px;
  border: 2px solid #f7a400;
  border-radius: 8px;
  background-color: #fff;
  max-width: 800px; /* 最大幅を設定 */
}

h2 {
  font-size: 24px;
  margin-bottom: 15px;
}

/* 仮の画像枠のスタイル */
.image-container {
  text-align: center;
  margin-bottom: 20px;
}

.image-placeholder {
  width: 100%;
  max-width: 300px;
  height: 200px;
  background-color: #e0e0e0;
  border: 1px dashed #999;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #666;
  font-size: 24px;
  margin-bottom: 20px;

}

.imageMap{
  align-items: center; /* コンテンツを上下中央に揃える */

}
.map-url-form{
  margin-top: 0px;
}

/* 依頼情報のスタイル */
.info p {
  font-size: 16px;
  margin: 8px 0;
}

strong {
  font-weight: bold;
}

.button-container{
  display: flex;
  align-items: center; /* 縦方向で中央揃え */
  justify-content: space-between; /* 子要素の間にスペースを挿入 */
  margin-top: 20px;
  padding: 10px; /* 余白を追加 */
  background-color: #ffca5f;

}
.button-container p {
  color: #333;
  margin-left: 20px; /* 余白をリセット */
  white-space: nowrap; /* 自動改行を防ぐ */
  font-size: 26px; /* フォントサイズを調整 */
}

.syusshi,
.jikko {
  flex-shrink: 0; /* ボタンの縮小を防ぐ */
}

#jiko{
  margin-left: 0px;
}
</style>
