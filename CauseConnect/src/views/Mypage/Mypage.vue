<script setup>
import { ref, reactive, onMounted } from 'vue';
import apiClient from '@/axios'; // axiosインスタンスのインポート
import PointHistory from './Component/PointHistory.vue';
// ポイント履歴のサンプルデータ（サーバーから取得する場合、APIを使用）
const currentPoints = ref(1200); // 現在の保有ポイント

// ユーザーデータを格納する`reactive`オブジェクト
const user = reactive({
  nickname: '',
  name: '',
  kana: '',
  birth: '',
  sex: '',
  tel: '',
  email: '',
  address: {  // addressをオブジェクトとして保持
    prefectures: '',
    address1: '',
    address2: '',
    post_code: '',
  },
  intro: '',
});

// フィードバックメッセージ
const message = ref('');

// ユーザーデータを取得
const fetchUserData = async () => {
  const token = localStorage.getItem('token'); // ローカルストレージからトークンを取得

  if (!token) {
    message.value = 'ログイン情報が見つかりません。再度ログインしてください。';
    return;
  }

  try {
    const response = await apiClient.get('/user/me', {
      headers: {
        Authorization: `Bearer ${token}`, // トークンをヘッダーに追加
      },
    });

    // レスポンスデータを `user` に設定
    const { data } = response;
    Object.assign(user, data);

    // addressが存在しない場合のデフォルト処理
    if (!user.address) {
      user.address = {
        prefecture: '',
        address1: '',
        address2: '',
        post_code: '',
      };
    }
  } catch (error) {
    console.error('ユーザーデータの取得に失敗しました:', error);
    message.value = 'ユーザーデータの取得に失敗しました。再度ログインしてください。';
  }
};

// 初期化処理
onMounted(() => {
  fetchUserData(); // ユーザーデータを取得
});
</script>

<template>
  <div class="mypage-container">
    <h1>マイページ</h1>
    <div>
      <strong>
        保有ポイント{{ currentPoints }}
      </strong>
      <PointHistory/>
    </div>


    <!-- エラーメッセージが存在する場合に表示 -->
    <p v-if="message" class="message">{{ message }}</p>

    <!-- ユーザーデータの表示 -->
    <div v-else>
      <p><strong>ニックネーム:</strong> {{ user.nickname }}</p>
      <p><strong>名前:</strong> {{ user.name }}</p>
      <p><strong>カナ:</strong> {{ user.kana }}</p>
      <p><strong>生年月日:</strong> {{ user.birth }}</p>
      <p><strong>性別:</strong> {{ user.sex }}</p>
      <p><strong>電話番号:</strong> {{ user.tel }}</p>
      <p><strong>メールアドレス:</strong> {{ user.email }}</p>
      <p><strong>郵便番号:</strong> {{ user.address.post_code || '' }}</p>
      <p><strong>都道府県:</strong>
        {{ user.address.prefectures.pref || '' }}</p>
      <p><strong>住所:</strong>
        {{ user.address.address1 || '' }}
        {{ user.address.address2 || '' }}</p>
      <p><strong>自己紹介:</strong> {{ user.intro }}</p>
    </div>
  </div>
</template>





<style scoped>
.mypage-container {
  font-family: 'Zen Maru Gothic', serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.user-info p {
  font-size: 16px;
  margin: 5px 0;
}

button {
  margin-top: 10px;
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #f7a400;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #ff8c00;
}

.form-group {
  margin-bottom: 15px;
}

input,
select,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.message {
  color: green;
  text-align: center;
}
</style>
