<script>
import apiClient from '@/axios'; // axiosインスタンスのインポート
import UserProfile from './components/UserProfile.vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        // サーバーにログインリクエストを送信
        const response = await apiClient.post('/login', {
          email: this.email,
          password: this.password,
        });

        // トークンをローカルストレージに保存
        localStorage.setItem('token', response.data.token);

        // ログイン成功後、ダッシュボードへリダイレクト
        this.$router.push('/');
      } catch (err) {
        // エラーハンドリング強化：レスポンスがない場合やリクエストが失敗した場合の対処
        if (err.response) {
          // サーバーがエラーレスポンスを返した場合
          this.error = err.response?.data?.message || 'ログインに失敗しました';
        } else if (err.request) {
          // リクエストは送信されたがサーバーから応答がなかった場合
          this.error = 'サーバーからの応答がありません。ネットワークを確認してください';
        } else {
          // その他のエラー
          this.error = `エラーが発生しました: ${err.message}`;
        }
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>ログインフォーム</h1>
    <div class="formBox">
      <form @submit.prevent="login">
        <div>
          <input type="email" id="email" v-model="email" placeholder="メールアドレスを入力" required />
        </div>
        <div>
          <input type="password" id="password" v-model="password" placeholder="パスワードを入力" required />
        </div>
        <button class="btn1" type="submit">ログイン</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.formBox{
  text-align: center;
}

.email{
  padding: 20px 100px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 35%;
  padding: 8px;
  border: 2px solid #f7a400;
  border-radius: 4px;
  margin-bottom: 10px;
}

.btn1{
  margin-top: 10px;
  padding: 8px 30px;
  margin-right: 13px;
  color: #333;
  font-size: 20px;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}
</style>
