<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/axios";

// 親コンポーネントから受け取る `request` プロパティを定義
const props = defineProps({
  request: {
    type: Object,
    required: true,
  },
});

// ユーザー情報を保持する状態
const userInfo = ref(null);

// ✅ ユーザー情報を取得する関数
const fetchUserInfo = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('[FavoriteIcon] トークンが見つかりません');
      return;
    }

    const response = await apiClient.get('/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    });

    userInfo.value = response.data;

  } catch (error) {
    console.error('[FavoriteIcon] ユーザー情報の取得に失敗:', error);
  }
};

// お気に入りの状態を管理するための状態
const isFavorite = ref(false);

// ✅ サーバーにお気に入り状態を問い合わせる関数
const fetchFavoriteStatus = async () => {
  try {
    if (!userInfo.value) {
      console.error('[FavoriteIcon] ユーザー情報が取得できていません');
      return;
    }

    const response = await apiClient.post('/favorites/check', {
      case_id: props.request.case_id,
      user_id: userInfo.value.user_id,
    });

    isFavorite.value = response.data.is_favorite; // サーバーのレスポンスから状態を設定
    console.log('[FavoriteIcon] 初期状態:', isFavorite.value);

  } catch (error) {
    console.error('[FavoriteIcon] お気に入り状態の取得に失敗:', error);
  }
};

// お気に入り状態を切り替え、データをサーバーに送信する関数
const toggleFavorite = async () => {
  isFavorite.value = !isFavorite.value; // お気に入りの状態を切り替える

  if (!userInfo.value) {
    console.error('[FavoriteIcon] ユーザー情報が取得できていません');
    return;
  }

  // サーバーへデータを送信
  const favoriteData = {
    case_id: props.request.case_id, // リクエストから取得
    user_id: userInfo.value.user_id, // ユーザー情報から取得
    is_favorite: isFavorite.value ? 1 : 0, // true → 1, false → 0
  };

  try {
    const response = await apiClient.post("/favorites", favoriteData);
    console.log("[FavoriteIcon] サーバーに送信成功:", response.data);
  } catch (error) {
    console.error("[FavoriteIcon] サーバーへの送信エラー:", error);
  }
};

// ✅ 初期化処理
onMounted(async () => {
  await fetchUserInfo(); // ✅ ユーザー情報の取得
  await fetchFavoriteStatus(); // ✅ お気に入り状態の取得
});
</script>

<template>
  <div @click="toggleFavorite" class="favorite-icon">
    <!-- お気に入りアイコン -->
    <span :class="isFavorite ? 'filled' : 'empty'">
      <!-- お気に入りが true なら塗りつぶされた星（★）、false なら空の星（☆） -->
      {{ isFavorite ? "★" : "☆" }}
    </span>
  </div>
</template>

<style scoped>
.favorite-icon {
  font-size: 2rem; /* アイコンのサイズを大きく設定 */
  cursor: pointer; /* クリック可能にする */
}

.favorite-icon .filled {
  color: #ff8c00; /* 塗りつぶされた星の色（ゴールド） */
}

.favorite-icon .empty {
  color: gray; /* 空の星の色（グレー） */
}
</style>
