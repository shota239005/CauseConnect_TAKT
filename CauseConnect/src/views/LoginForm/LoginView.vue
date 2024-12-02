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

    <!-- エラーメッセージ（任意） -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "", // メールアドレス
        password: "", // パスワード
      },
      errorMessage: "", // エラーメッセージ
    };
  },
  methods: {
    handleLogin() {
      // フォームの入力内容をコンソールに表示（実際のログイン処理を行う）
      console.log("ログイン情報:", this.form);

      // 仮のバリデーション
      if (this.form.email === "test@example.com" && this.form.password === "password123") {
        // 正常なログインの場合
        this.errorMessage = "";
        alert("ログイン成功！");
        // ここでログイン後の処理を行います（例えば、リダイレクトなど）
      } else {
        // エラーメッセージの表示
        this.errorMessage = "メールアドレスまたはパスワードが間違っています";
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
}
</style>
