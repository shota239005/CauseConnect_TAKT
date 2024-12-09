<script>
import RealTimeClock from './RealTimeClock.vue';
import apiClient from '@/axios'; // Axiosインスタンスをインポート

export default {
  name: "Navi",
  data() {
    return {
      isLoggedIn: false, // ログイン状態
      user: null, // ユーザー情報
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    // トークンを確認してログイン状態を初期化
    async checkLoginStatus() {
      const token = localStorage.getItem('token');
      if (token) {
        this.isLoggedIn = true;
        try {
          const response = await apiClient.get('/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.user = response.data.user; // ユーザー情報をセット
        } catch (error) {
          console.error('ユーザー情報の取得に失敗しました', error);
          this.logout(); // エラー時にはログアウト処理
        }
      }
    },
    // ログアウト処理
    logout() {
      localStorage.removeItem('token'); // トークンを削除
      this.isLoggedIn = false;
      this.user = null;
      alert('ログアウトしました');
      this.$router.push('/login'); // ログインページへリダイレクト
    },
    // ロゴをクリックした時にトップページに遷移
    goToHome() {
      this.$router.push("/");
    },
    // 依頼するボタンをクリックした時にTokoページに遷移
    goToToko() {
      this.$router.push("/Toko");
    },
  },
  components: {
    RealTimeClock,
    /*PointHistory,*/
  },
};
</script>

<template>
  <header class="nav">
    <!-- サイトロゴ（クリックでトップページへ遷移） -->
    <div class="logo" @click="goToHome">
      <img src="../assets/CC_logo.png" />
    </div>

    <RealTimeClock />

    <!-- ナビゲーションメニュー -->
    <nav class="nav-links">
      <router-link to="/">
        <button class="btn1">Home</button>
      </router-link>

      <router-link to="/list">
        <button class="btn1">依頼一覧</button>
      </router-link>

      <!-- ログイン状態に応じて表示切り替え -->

      <router-link to="/info">
        <button class="btn1">当サイトについて</button>
      </router-link>

      <router-link to="/FAQ">
        <button class="btn1">FAQ</button>
      </router-link>



    <div v-if="isLoggedIn">
        <router-link to="/mypage">
          <button class="btn1">マイページ</button>
        </router-link>
        <button class="btn1" @click="logout">ログアウト</button>
      </div>
      <div v-else>
        <router-link to="/login">
          <button class="btn1">ログイン</button>
        </router-link>
        <router-link to="/register">
          <button class="btn1">新規登録</button>
        </router-link>
      </div>

    </nav>


    <!-- 依頼するボタン -->
    <div>
      <button class="btn1" @click="goToToko">依頼する</button>
    </div>
  </header>
</template>

<style scoped>
/* ナビバー全体のスタイル */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  color: white;
  padding: 0.5rem 1rem;
  flex-wrap: wrap;
}

/* ロゴのスタイル */
.logo img {
  height: 40px;
  cursor: pointer;
}

/* ナビゲーションリンクのスタイル */
.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-links button {
  font-family: "Zen Maru Gothic", serif;
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.nav-links button:hover {
  text-decoration: underline;
}

/* 依頼するボタンのスタイル */
div {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

div button {
  font-family: "Zen Maru Gothic", serif;
  background-color: #f7a400;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

div button:hover {
  background-color: #ff8c00;
}

/* ポイント履歴のスタイル */
.point-history {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.point-history h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.point-history p {
  font-size: 1.2rem;
  margin: 5px 0;
}
</style>
