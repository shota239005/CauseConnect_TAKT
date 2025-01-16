<script setup>
import { ref, reactive, onMounted } from 'vue';
import apiClient from '@/axios'; // axiosインスタンスのインポート
import PointHistory from './Component/PointHistory.vue';
import PurchasePoints from './Component/PurchasePoints.vue';
import PhotoUploader from './Component/PhotoUploader.vue';
import PointExchange from './Component/PointExchange.vue';
// 現在の保有ポイント（合計値を反映）
const currentPoints = ref(0);

// ユーザーデータ
const user = reactive({
  nickname: '',
  name: '',
  kana: '',
  birth: '',
  sex: '',
  tel: '',
  email: '',
  address: {
    prefectures: '', // 都道府県名
    address1: '',
    address2: '',
    post_code: '',
  },
  intro: '',
});

// 性別リスト
const sexes = ['男性', '女性', 'その他'];

// 都道府県リスト
const prefecture = ref([]);

// フィードバックメッセージ
const message = ref('');

// ログインしているユーザー情報とポイント履歴を取得
const fetchUserData = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    message.value = 'ログイン情報が見つかりません。再度ログインしてください。';
    return;
  }

  try {
    const userResponse = await apiClient.get('/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const pointsResponse = await apiClient.get('/points/history', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // ユーザーデータを反映
    Object.assign(user, userResponse.data);

    // ポイント履歴の合計値を計算して反映
    const totalPoints = pointsResponse.data.history.reduce((sum, transaction) => {
      return sum + transaction.points;
    }, 0);
    currentPoints.value = totalPoints;

    message.value = 'データを正常に取得しました。';
  } catch (error) {
    console.error('データ取得に失敗:', error);
    message.value = 'データ取得に失敗しました。再度ログインしてください。';
    currentPoints.value = 0;
  }
};

// 都道府県リストを取得
const fetchPrefectures = async () => {
  try {
    const response = await apiClient.get('/prefectures'); // 都道府県データを取得するAPI
    prefecture.value = response.data; // 都道府県リストをセット
  } catch (error) {
    console.error('都道府県リストの取得に失敗しました:', error);
    message.value = '都道府県リストの取得に失敗しました。';
  }
};

// ユーザーデータを更新
const updateUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      message.value = 'ログイン情報が見つかりません。再度ログインしてください。';
      return;
    }

    const response = await apiClient.put('/user/update', user, {
      headers: { Authorization: `Bearer ${token}` },
    });

    message.value = 'ユーザー情報を更新しました。';
    alert('ユーザー情報が正常に更新されました！');
    console.log('更新成功:', response.data);
  } catch (error) {
    console.error('ユーザーデータの更新に失敗しました:', error);
    message.value = 'ユーザーデータの更新に失敗しました。';
  }
};

// アカウント削除
const deleteAccount = async () => {
  if (!confirm('本当にアカウントを削除してもよろしいですか？')) {
    return;
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      message.value = 'ログイン情報が見つかりません。再度ログインしてください。';
      return;
    }

    await apiClient.delete('/user/delete', {
      headers: { Authorization: `Bearer ${token}` },
    });

    message.value = 'アカウントが削除されました。';
    localStorage.removeItem('token');
    window.location.href = '/login'; // ログインページにリダイレクト
  } catch (error) {
    console.error('アカウント削除に失敗しました:', error);
    message.value = 'アカウント削除に失敗しました。';
  }
};

// 初期化
onMounted(() => {
  fetchUserData();
  fetchPrefectures();
});
</script>

<template>
  <div class="mypage-container">
    <h1>マイページ</h1>
    <div>
      <PhotoUploader />
    </div>

    <div class="points-section">
      <div class="points-card">
        <div class="points-info">
          <h2>🪙保有ポイント</h2>
          <p>{{ currentPoints }} pt</p>
        </div>
      </div>

      <div class="actions">
        <PointHistory />
        <!-- ポイント購入ポップアップボタン -->
        <PurchasePoints @pointsPurchased="fetchUserData" />
        <PointExchange/>
      </div>
    </div>



    <!-- フィードバックメッセージ -->
    <p v-if="message" class="message">{{ message }}</p>

    <!-- ユーザー情報の表示と編集フォーム -->
    <form @submit.prevent="updateUserData">
      <div class="left-container">
        <div>
          <label for="nickname">ニックネーム:</label>
          <input id="nickname" v-model="user.nickname" type="text" />
        </div>
        <div>
          <label for="name">名前:</label>
          <input id="name" v-model="user.name" type="text" />
        </div>
        <div>
          <label for="kana">カナ:</label>
          <input id="kana" v-model="user.kana" type="text" />
        </div>
        <div class="birthday">
          <label for="birth">生年月日:</label>
          <input id="birth" v-model="user.birth" type="date" />
        </div>
        <div class="sex">
          <label for="sex">性別:</label>
          <select id="sex" v-model="user.sex">
            <option v-for="option in sexes" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div>
          <label for="tel">電話番号:</label>
          <input id="tel" v-model="user.tel" type="tel" />
        </div>
      </div>

      <div class="right-container">
        <div>
          <label for="email">メールアドレス:</label>
          <input id="email" v-model="user.email" type="email" />
        </div>
        <div class="town">
          <label for="prefectures">都道府県:</label>
          <select id="prefectures" v-model="user.address.prefectures.pref_id">
            <option v-for="pref in prefecture" :key="pref.pref_id" :value="pref.pref_id">
              {{ pref.pref }}
            </option>
          </select>
        </div>
        <div>
          <label for="address1">住所1:</label>
          <input id="address1" v-model="user.address.address1" type="text" />
        </div>
        <div>
          <label for="address2">住所2:</label>
          <input id="address2" v-model="user.address.address2" type="text" />
        </div>
        <div>
          <label for="post_code">郵便番号:</label>
          <input id="post_code" v-model="user.address.post_code" type="text" />
        </div>
        <div>
          <label for="intro">自己紹介:</label>
          <textarea id="intro" v-model="user.intro"></textarea>
        </div>

        <button type="submit" class="btn1">更新する</button>
        <button type="button" @click="deleteAccount" class="btnNo">アカウント削除</button>

      </div>
    </form>
  </div>
</template>


<style scoped>
.mypage-container {
  font-family: 'Zen Maru Gothic', serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
}

.birthday{
  width: 30%;
}

.sex{
  width: 35%;
}
.town{
  width: 30%;
}


h1 {
  text-align: center;
  margin-bottom: 20px;
}

.user-info p {
  font-size: 16px;
  margin: 5px 0;
}




.btn1{
  padding: 20px 100px;
  margin-right: 30px;
}

.btnNo{
  color: #fff;
  background-color: #ff6060;
  box-shadow: 5px 5px 0 #db3f3f;

}

.btnNo:hover {
    color: #fff;
    background-color: #db3f3f;
    box-shadow: 0 0 0;
    transform: translate(5px, 5px);
}


form {
  display: flex; /* 横並びにする */
  gap: 200px; /* 左右コンテナ間の余白を調整 */
}

.form-group {
  margin-bottom: 15px;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 3px solid #f7a400;
  border-radius: 4px;
  margin-bottom: 10px;
}


.message {
  color: green;
  text-align: center;
}

.points-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 200px;
  margin-top: 0px;
  height: 100%;
}

.points-card{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


.points-card {
  background: #fff3cd;
  padding: 50px;
  border-radius: 10px;
  width: 250px;
  height: 130px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.points-icon, .points-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}


.points-info {
  display: flex;
  flex-direction: column; /* 縦並びに変更 */
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.points-info p {
  font-size: 44px; /* ポイント数の数字を大きく */
  font-weight: bold;
  margin: 0;
}


.actions {
  gap: 15px;
}

label{
  font-size: 30px;
}

.left-container,
.right-container {
  width: 40%; /* 両要素を横並びで収める */
  box-sizing: border-box; /* パディングを含めた幅計算 */
}

</style>
