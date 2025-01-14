<script setup>
import { ref } from 'vue';
import Jikko from './Jikko.vue';
import Syusshi from './Syusshi.vue';
import Map from '@/components/Map.vue';
<<<<<<< HEAD:CauseConnect/src/views/Detail/components/BasicInfo/BasicInfo.vue

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
=======
import Home from '@/views/home/home.vue';

// 親コンポーネントから受け取る `request` プロパティを定義
const props = defineProps({
  request: {
    type: Object,
    required: true,
  },
});

// デバッグ用ログ
// console.log('BasicInfo:', props.request);

// データ構造に対応する変数
const requestData = props.request[0]; // データが `0` のキーに入っている場合
console.log('BasicInfo:', requestData);
>>>>>>> teamTA:CauseConnect/src/views/Detail/components/BasicInfo.vue
</script>

<template>
  <div class="basic-info">
    <h2>基本情報</h2>

    <!-- デバッグ用 -->
    <!-- <pre>{{ request }}</pre>
    <pre>{{ requestData }}</pre> -->

    <!-- 仮の画像枠 -->
    <div class="image-container">
      <div class="image-placeholder">画像をここに表示</div>
    </div>

    <!-- requestData を表示 -->
    <div class="info">
<<<<<<< HEAD:CauseConnect/src/views/Detail/components/BasicInfo/BasicInfo.vue
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
=======
      <p><strong>依頼名：</strong>{{ requestData.case_name || 'データなし' }}</p>
      <p><strong>活動日：</strong>{{ requestData.case_date  || 'データなし' }}</p>
      <p><strong>活動時間：</strong>{{ requestData.start_activty || '不明' }}時～{{ requestData.end_activty || '不明' }}時</p>
      <p><strong>場所：</strong>{{ requestData.area_detail  || 'データなし' }}</p>
      <p><strong>必要備品：</strong>{{ requestData.equipment  || 'データなし' }}</p>
      <p><strong>依頼達成条件：</strong>{{ requestData.achieve  || 'データなし' }}</p>
      <p><strong>依頼詳細：</strong>{{ requestData.contents  || 'データなし' }}</p>
    </div>

    <!-- 仮の画像枠 -->
    <div class="image-container">
      <div class="image-placeholder">画像をここに表示</div>
    </div>

    <Map />

    <div class="button-container">
      <RouterLink to="/">
        <button class="syusshi">出資者で参加</button>
      </RouterLink>
>>>>>>> teamTA:CauseConnect/src/views/Detail/components/BasicInfo.vue
      <p>どちらで参加しますか？</p>
      <button class="jikko" @click="openPopup('jikko')">実行者で参加</button>
    </div>
<<<<<<< HEAD:CauseConnect/src/views/Detail/components/BasicInfo/BasicInfo.vue

    <!-- ポップアップ -->
    <Syusshi v-if="activePopup === 'syusshi'" @close="closePopup" />
    <Jikko v-if="activePopup === 'jikko'" @close="closePopup" />
=======
>>>>>>> teamTA:CauseConnect/src/views/Detail/components/BasicInfo.vue
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
