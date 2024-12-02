<template>
  <div class="login-container">
    <h1>ログイン</h1>

    <!-- ログインフォーム -->
    <form @submit.prevent="handleLogin">
      <!-- メールアドレス -->
      <div class="form-group">
        <label for="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="メールアドレスを入力"
          required
        />
      </div>

      <!-- パスワード -->
      <div class="form-group">
        <label for="password">パスワード</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          placeholder="パスワードを入力"
          required
        />
      </div>

      <!-- ログインボタン -->
      <button type="submit" class="login-button">ログイン</button>
    </form>

    <!-- エラーメッセージ -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "@/axios"; // Axiosのインスタンス

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        // LaravelのAPIにログインリクエストを送信
        const response = await axios.post("/api/login", this.form);
        alert("ログイン成功");

        // 成功時にクッキーにメールアドレスが保存されます
        // フロントエンドで使用する場合、axios.defaults.headersを設定することも可能
      } catch (error) {
        this.errorMessage = error.response.data.message || "ログインに失敗しました";
      }
    },
  },
};
</script>

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
