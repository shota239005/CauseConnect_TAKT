<script setup>
import { ref } from 'vue';
import Jikko from './Jikko.vue';
import Syusshi from './Syusshi.vue';
import Map from '@/components/Map.vue';

// モックデータ
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

// 現在表示中のポップアップタイプ
const activePopup = ref(null); // 'syusshi' または 'jikko'

// ポップアップを開く
const openPopup = (type) => {
  activePopup.value = type;
};

// ポップアップを閉じる
const closePopup = () => {
  activePopup.value = null;
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
        <strong>活動時間：</strong>{{ request.startTime }}時～{{ request.endTime }}時
      </p>
      <p>
        <strong>場所：</strong>{{ request.prefecture }} {{ request.address1 }} {{ request.address2 }}
      </p>
      <p><strong>必要備品：</strong>{{ request.equipmentNeeded }}</p>
      <p><strong>活動目的：</strong>{{ request.basicInfo }}</p>
      <p><strong>依頼詳細：</strong>{{ request.requestDetails }}</p>
    </div>

    <!-- 地図表示 -->
    <Map />

    <!-- ボタン -->
    <div class="button-container">
      <button class="syusshi" @click="openPopup('syusshi')">出資者で参加</button>
      <p>どちらで参加しますか？</p>
      <button class="jikko" @click="openPopup('jikko')">実行者で参加</button>
    </div>

    <!-- ポップアップ -->
    <Syusshi v-if="activePopup === 'syusshi'" @close="closePopup" />
    <Jikko v-if="activePopup === 'jikko'" @close="closePopup" />
  </div>
</template>

<style scoped>
.basic-info {
  margin-left: -25px;
  padding: 15px;
  border: 2px solid #f7a400;
  border-radius: 8px;
  background-color: #fff;
  max-width: 800px;
}

h2 {
  font-size: 24px;
  margin-bottom: 15px;
}

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

.info p {
  font-size: 16px;
  margin: 10px 0;
}

strong {
  font-weight: bold;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 33px;
  margin-bottom: 31px;
  padding: 10px;
  background-color: #ffca5f;
}

.button-container p {
  color: #333;
  white-space: nowrap;
  font-size: 26px;
}

.syusshi,
.jikko {
  flex-shrink: 0;
}

#jiko {
  margin-left: 0px;
}
</style>
