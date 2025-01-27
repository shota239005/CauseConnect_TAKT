<script setup>
import { defineEmits, defineProps, ref, onMounted } from 'vue';
import apiClient from '@/axios';
import Jikko from './Jikko.vue';
import Syusshi from './Syusshi.vue';

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
console.log('地図url', requestData.google_map);

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
      console.log('[DEBUG] ピクチャータイプ1の画像取得成功:', imageUrlType1.value);
    } else {
      console.warn('[WARN] ピクチャータイプ1の画像が存在しません');
      imageUrlType1.value = "/default-avatar.png";  // デフォルト画像
    }

    // ピクチャータイプ2の画像取得
    const responseType2 = await apiClient.get(`/images/${requestData.case_id}/2`);
    if (responseType2.data && responseType2.data.picture) {
      imageUrlType2.value = `${baseURL}${responseType2.data.picture}`;
      console.log('[DEBUG] ピクチャータイプ2の画像取得成功:', imageUrlType2.value);
    } else {
      console.warn('[WARN] ピクチャータイプ2の画像が存在しません');
      imageUrlType2.value = "/default-avatar.png";  // デフォルト画像
    }

  } catch (error) {
    console.error('[ERROR] 画像の取得に失敗しました:', error);

    // 404エラーの場合にのみデフォルト画像を設定
    if (error.response && error.response.status === 404) {
      console.warn('[WARN] 画像が見つかりません (404 Not Found)');
    }

    // どんなエラーでもデフォルト画像を設定
    imageUrlType1.value = "/default-avatar.png";
    imageUrlType2.value = "/default-avatar.png";
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

    <!-- Google Map 表示 -->
    <div class="map-container" v-if="requestData.google_map">
      <label for="map-url"></label>
      <iframe
        :src="requestData.google_map"
        width="800ox"
        height="400px"
        frameborder="0"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>

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
  border-radius: 8px;
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
  width: 500px; /* 幅を400pxに固定 */
  height: 300px; /* 高さを300pxに固定 */
  overflow: hidden; /* はみ出した部分を非表示にする */
  border-radius: 8px; /* 角を丸くする（任意） */
  display: flex; /* 内部要素のサイズ調整用 */
  justify-content: center;
  align-items: center;

}

.fixed-size img {
  width: 100%; /* コンテナの幅いっぱいに広げる */
  height: 100%; /* コンテナの高さいっぱいに広げる */
  object-fit: cover; /* 画像を要素のサイズまで拡大し、トリミングする */
}
</style>

