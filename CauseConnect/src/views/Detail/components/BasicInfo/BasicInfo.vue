<script setup>
import { defineEmits, defineProps, ref, onMounted } from 'vue';
import apiClient from '@/axios';
import Jikko from './Jikko.vue';
import Syusshi from './Syusshi.vue';
import Map from '@/components/Map.vue';

// ✅ 親コンポーネントから受け取る userId と request
const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
  request: {
    type: Object,
    required: true,
  },
});

// ポップアップ管理
const isPopupVisible = ref(false);
const popupType = ref('');

// ポップアップを開く関数
const openPopup = (type) => {
  popupType.value = type;
  isPopupVisible.value = true;
};

// ポップアップを閉じる関数
const closePopup = () => {
  isPopupVisible.value = false;
};

// 依頼情報に対応する変数
const requestData = props.request[0];

// 画像データ用の変数（タイプ1とタイプ2）
const imageUrlType1 = ref('');
const imageUrlType2 = ref('');

// APIから画像データを取得する関数（タイプごとに取得）
const fetchImage = async () => {
  try {
    const baseURL = (apiClient.defaults.baseURL || "").replace(/\/api$/, "");

    // ピクチャータイプ1の画像取得
    const responseType1 = await apiClient.get(`/images/${requestData.case_id}/1`);
    if (responseType1.data && responseType1.data.picture) {
      imageUrlType1.value = `${baseURL}${responseType1.data.picture}`;
    }

    // ピクチャータイプ2の画像取得
    const responseType2 = await apiClient.get(`/images/${requestData.case_id}/2`);
    if (responseType2.data && responseType2.data.picture) {
      imageUrlType2.value = `${baseURL}${responseType2.data.picture}`;
    }
  } catch (error) {
    console.error('画像の取得に失敗しました:', error);
  }
};

// コンポーネントがマウントされたときに画像を取得
onMounted(() => {
  if (!props.userId) {
    console.warn('[BasicInfo] userIdがまだ取得されていません。');
  } else {
    console.log('[BasicInfo] 受け取った userId:', props.userId,'caseId:',requestData.case_id);
  }
  fetchImage();
});
</script>

<template>
  <div class="basic-info">
    <h2>基本情報</h2>

    <!-- ピクチャータイプ1の画像表示 -->
    <div class="image-container">
      <div v-if="imageUrlType1" class="image-wrapper">
        <img :src="imageUrlType1" alt="依頼画像 (タイプ1)" class="displayed-image fixed-size" />
      </div>
      <div v-else class="image-placeholder">
        画像をここに表示
      </div>
    </div>

    <!-- requestData を表示 -->
    <div class="info">
      <p><strong>依頼名：</strong>{{ requestData.case_name || 'データなし' }}</p>
      <p><strong>活動日：</strong>{{ requestData.case_date || 'データなし' }}</p>
      <p><strong>活動時間：</strong>{{ requestData.start_activty || '不明' }}時～{{ requestData.end_activty || '不明' }}時</p>
      <p><strong>場所：</strong>{{ requestData.area_detail || 'データなし' }}</p>
      <p><strong>必要備品：</strong>{{ requestData.equipment || 'データなし' }}</p>
      <p><strong>依頼達成条件：</strong>{{ requestData.achieve || 'データなし' }}</p>
      <p><strong>依頼詳細：</strong>{{ requestData.contents || 'データなし' }}</p>
    </div>

    <!-- ピクチャータイプ2の画像表示 -->
    <div class="image-container">
      <div v-if="imageUrlType2" class="image-wrapper">
        <img :src="imageUrlType2" alt="依頼画像 (タイプ2)" class="displayed-image fixed-size" />
      </div>
      <div v-else class="image-placeholder">
        ピクチャータイプ2の画像をここに表示
      </div>
    </div>

    <Map />

    <div class="button-container">
      <button class="syusshi" @click="openPopup('syusshi')">出資者で参加</button>
      <p>どちらで参加しますか？</p>
      <button class="jikko" @click="openPopup('jikko')">実行者で参加</button>
    </div>

    <!-- ポップアップ表示 -->
    <Syusshi v-if="isPopupVisible && popupType === 'syusshi'" :userId="props.userId" :caseId="requestData.case_id" @close="closePopup" />
    <Jikko v-if="isPopupVisible && popupType === 'jikko'" :userId="props.userId" :caseId="requestData.case_id" @close="closePopup" />
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

.fixed-size {
  width: 400px;
  /* 幅を300pxに固定 */
  height: 300px;
  /* 高さを200pxに固定 */
  object-fit: contain;
  /* 画像全体を表示（トリミングしない） */
  border-radius: 8px;
  /* 角を丸くする（任意） */
  background-color: #f4f4f4;
  /* 余白部分の背景色（任意） */
}
</style>
