<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import apiClient from "@/axios"; // APIクライアントをインポート

const userInfo = ref(null); // ユーザー情報
const popupDataResult = ref(null); // サーバーのレスポンスデータ
const enrichedRequests = ref([]); // 各リクエストデータに都道府県名を追加
const prefectures = ref([]); // 都道府県データを保存する変数
const router = useRouter(); // ルーターインスタンス

const fetchApi = async (url, options = {}) => {
  try {
    const response = await apiClient(url, options);
    return response.data;
  } catch (error) {
    console.error(`APIリクエスト失敗: ${url}`, error);
    throw error; // 必要ならエラーを再スロー
  }
};

// ✅ ユーザー情報を取得する関数
const fetchUserInfo = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('[Favopup] トークンが見つかりません');
      return;
    }

    const response = await apiClient.get('/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    });

    userInfo.value = response.data;
    // console.log('[Favopup] 取得したユーザー情報:', userInfo.value);

    // サーバーに送信
    await popupData(userInfo.value.user_id);

  } catch (error) {
    console.error('[Favopup] ユーザー情報の取得に失敗:', error);
  }
};

// 都道府県名のキャッシュを管理し、名前を取得
const fetchPrefectureName = async (prefId) => {
  if (prefectures.value.length === 0) {
    try {
      prefectures.value = await fetchApi("/prefectures");
    } catch {
      return "不明な都道府県";
    }
  }
  const prefecture = prefectures.value.find((pref) => pref.pref_id === prefId);
  return prefecture ? prefecture.pref : "不明な都道府県";
};

// サーバーからデータを取得して都道府県名を追加
const popupData = async () => {
  try {
    popupDataResult.value = await fetchApi("/favopopup", {
      method: "POST",
      data: { user_id: userInfo.value.user_id },
    });
    console.log("サーバーからのデータ:", popupDataResult.value);

    await enrichRequestData();
  } catch (error) {
    console.error("サーバーへの送信エラー:", error);
  }
};

// リクエストデータに都道府県名と画像URLを追加する関数
const enrichRequestData = async () => {
  const baseURL = "http://172.16.3.136:8000";

  if (prefectures.value.length === 0) {
    await fetchPrefectureName(); // 都道府県データをキャッシュ
  }

  enrichedRequests.value = popupDataResult.value.map((request) => {
    const enrichedRequest = { ...request }; // データを複製
    const prefecture = prefectures.value.find((pref) => pref.pref_id === request.address.pref_id);
    enrichedRequest.address.pref_name = prefecture ? prefecture.pref : "不明な都道府県";
    enrichedRequest.pictureUrl = request.picture
      ? `${baseURL}${request.picture}`
      : "default-avatar.png";
    return enrichedRequest;
  });

  console.log("最終リクエストデータ:", JSON.stringify(enrichedRequests.value, null, 2));
};

// ✅ ページをリロードする関数
const navigateAndReload = (caseId) => {
  router.push(`/details/${caseId}`).then(() => {
    window.location.reload();
  });
};

// ✅ コンポーネントがマウントされた時にデータ取得
onMounted(async () => {
  await fetchUserInfo(); // ✅ ユーザー情報の取得
});
</script>

<template>
  <div v-if="enrichedRequests.length > 0" class="request-items">
    <div v-for="(item, index) in enrichedRequests" :key="index" class="request-item">
      <!-- 左側に画像を表示 -->
      <div class="request-image">
        <img :src="item.pictureUrl" alt="slide image" class="request-image" />
      </div>

      <!-- 右側に依頼情報を表示 -->
      <div class="request-info">
        <h3>{{ item.case_name }}</h3>
        <p><strong>日付:</strong> {{ item.case_date }}</p>
        <p><strong>都道府県:</strong> {{ item.address.pref_name }}</p>
        <p><strong>場所:</strong> {{ item.address?.address1 }} {{ item.address?.address2 }}</p>
        <p><strong>活動内容:</strong> {{ item.content }}</p>

        <!-- 詳細ページへのリンク -->
        <button @click="navigateAndReload(item.case_id)" class="details-link">
          詳細を見る
        </button>
      </div>
    </div>
  </div>
  <p v-else>ロード中</p>
</template>

<style scoped>
.request-item {
  display: flex;
  gap: 20px;
  /* 画像と情報の間にスペースを追加 */
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  position: relative;
  /* お気に入りアイコンを配置するため */
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* 画像部分のスタイル（仮枠） */
.request-image {
  width: 200px;
  /* 画像の幅 */
  height: 150px;
  /* 画像の高さ */
  background-color: #ccc;
  /* グレーの背景 */
  border-radius: 5px;
  /* 角を丸く */
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
  flex-grow: 1;
  /* 残りのスペースを占める */
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
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.details-link:hover {
  text-decoration: underline;
}
</style>
