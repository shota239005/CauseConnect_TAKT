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
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = err.response?.data?.message || 'ログインに失敗しました';
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>ログインフォーム</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">メールアドレス</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">パスワード</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">ログイン</button>
    </form>
    <p v-if="error">{{ error }}</p>
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

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button.login-button {
  width: 100%;
  padding: 10px;
  background-color: #f7a400;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.login-button:hover {
  background-color: #ff8c00;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}
</style>
