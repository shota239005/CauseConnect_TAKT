<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from '@/axios'; // axiosの設定をインポート

// ユーザーデータを格納する`reactive`オブジェクト
const user = reactive({
  password: '',
  nickname: '',
  name: '',
  kana: '',
  birth: '',
  sex: '',
  tel: '',
  email: '',
  address1: '',
  address2: '',
  post_code: '',
  prefecture: '',
  intro: '',
});

// 都道府県リスト
const prefectures = ref([]);

// 編集モードの状態
const isEditing = ref(false);

// フィードバックメッセージ
const message = ref('');

// データベースからユーザーデータを取得
const fetchUserData = async () => {
  try {
    const response = await axios.get('/user/me'); // APIエンドポイントを変更してください
    Object.assign(user, response.data); // サーバーからのデータを`user`に設定
  } catch (error) {
    console.error('ユーザーデータの取得に失敗しました！:', error);
    message.value = 'ユーザーデータの取得に失敗しましたよん。';
  }
};

// 都道府県リストを取得
const fetchPrefectures = async () => {
  try {
    const response = await axios.get('/prefectures');
    prefectures.value = response.data;
  } catch (error) {
    console.error('都道府県リストの取得に失敗しました:', error);
  }
};

// ユーザーデータを更新
const updateUserData = async () => {
  try {
    const payload = { ...user }; // 現在のユーザーデータを送信
    const response = await axios.put('/user/update', payload); // APIエンドポイントを変更してください
    message.value = response.data.message || '更新が完了しました！';
    isEditing.value = false; // 編集モードを終了
  } catch (error) {
    console.error('更新に失敗しました:', error);
    message.value = '更新に失敗しました。';
  }
};

// アカウント削除機能
const deleteAccount = async () => {
  if (confirm('本当に削除しますか？')) {
    try {
      await axios.delete('/user/delete'); // APIエンドポイントを適宜変更
      message.value = 'アカウントが削除されました。';
      setTimeout(() => {
        window.location.href = '/logout'; // 必要に応じてリダイレクト
      }, 2000);
    } catch (error) {
      console.error('アカウント削除に失敗しました！チックショー！:', error);
      message.value = 'アカウント削除に失敗しましたよん。';
    }
  }
};





// 初期化処理
onMounted(() => {
  fetchUserData(); // ユーザーデータの取得
  fetchPrefectures(); // 都道府県リストの取得
});
</script>

<template>
  <div class="mypage-container">
    <h1>マイページ</h1>
    <p v-if="message" class="message">{{ message }}</p>

    <!-- 表示モード -->
    <div v-if="!isEditing">
      <div class="user-info">
        <p><strong>ニックネーム:</strong> {{ user.nickname }}</p>
        <p><strong>名前:</strong> {{ user.name }}</p>
        <p><strong>カナ:</strong> {{ user.kana }}</p>
        <p><strong>生年月日:</strong> {{ user.birth }}</p>
        <p><strong>性別:</strong> {{ user.sex }}</p>
        <p><strong>電話番号:</strong> {{ user.tel }}</p>
        <p><strong>メールアドレス:</strong> {{ user.email }}</p>
        <p><strong>住所:</strong> {{ user.prefecture }} {{ user.address1 }} {{ user.address2 }}</p>
        <p><strong>郵便番号:</strong> {{ user.post_code }}</p>
        <p><strong>自己紹介:</strong> {{ user.intro }}</p>
      </div>
      <button @click="isEditing = true">編集する</button>
      <a @click.prevent="deleteAccount" style="cursor: pointer; color: red;">アカウント削除</a>
    </div>

    <!-- 編集モード -->
    <form v-else @submit.prevent="updateUserData">
      <div class="form-group">
        <label for="nickname">ニックネーム</label>
        <input type="text" id="nickname" v-model="user.nickname" required />
      </div>

      <div class="form-group">
        <label for="name">名前</label>
        <input type="text" id="name" v-model="user.name" required />
      </div>

      <div class="form-group">
        <label for="kana">カナ</label>
        <input type="text" id="kana" v-model="user.kana" required />
      </div>

      <div class="form-group">
        <label for="birth">生年月日</label>
        <input type="date" id="birth" v-model="user.birth" required />
      </div>

      <div class="form-group">
        <label for="sex">性別</label>
        <select id="sex" v-model="user.sex" required>
          <option value="男性">男性</option>
          <option value="女性">女性</option>
          <option value="その他">その他</option>
        </select>
      </div>

      <div class="form-group">
        <label for="tel">電話番号</label>
        <input type="tel" id="tel" v-model="user.tel" required />
      </div>

      <div class="form-group">
        <label for="prefecture">都道府県</label>
        <select id="prefecture" v-model="user.prefecture" required>
          <option v-for="pref in prefectures" :key="pref.pref_id" :value="pref.pref_id">
            {{ pref.pref }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="address1">住所1（市町村）</label>
        <input type="text" id="address1" v-model="user.address1" required />
      </div>

      <div class="form-group">
        <label for="address2">住所2（番地・建物名）</label>
        <input type="text" id="address2" v-model="user.address2" />
      </div>

      <div class="form-group">
        <label for="post-code">郵便番号</label>
        <input type="text" id="post-code" v-model="user.post_code" required />
      </div>

      <div class="form-group">
        <label for="intro">自己紹介</label>
        <textarea id="intro" v-model="user.intro" rows="5"></textarea>
      </div>

      <button type="submit">更新する</button>
      <button type="button" @click="isEditing = false">キャンセル</button>
    </form>
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
