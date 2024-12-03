<script>
// apiClient は axios インスタンスのインポート
import apiClient from '@/axios'; // src/axios.js へのパス

export default {
  data() {
    return {
      user: null,  // ユーザー情報
      isLoggedIn: false,  // ログイン状態を保持
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    // ログイン状態を確認
    checkLoginStatus() {
      const token = localStorage.getItem('token'); // ローカルストレージからトークンを取得
      if (token) {
        this.isLoggedIn = true;
        this.getUser(); // トークンがあれば、ユーザー情報を取得
      }
    },
    // ユーザー情報を取得
    async getUser() {
      try {
        const response = await apiClient.get('/user');
        this.user = response.data.user; // ユーザー情報を設定
      } catch (error) {
        this.user = null;
        console.error('ユーザー情報の取得に失敗しました');
      }
    },
    // ログアウト処理
    async logout() {
      try {
        await apiClient.post('/logout'); // サーバーサイドでログアウト処理を行う
        localStorage.removeItem('token'); // ローカルストレージからトークンを削除
        this.user = null; // ユーザー情報をリセット
        this.isLoggedIn = false; // ログイン状態を更新
        alert('ログアウトしました');
      } catch (error) {
        console.error('ログアウトに失敗しました');
      }
    },
  },
};
</script>

<template>
  <div>
    <!-- ログインしている場合にユーザー情報を表示 -->
    <div v-if="isLoggedIn && user">
      <h1>{{ user.name }} さん、ようこそ</h1>
      <button @click="logout">ログアウト</button>
    </div>

    <!-- ログインしていない場合のメッセージ -->
    <div v-else>
      <h1>ログインしてください</h1>
    </div>
  </div>
</template>
