<script>
import RealTimeClock from './RealTimeClock.vue';
import PointHistory from '@/views/Mypage/Component/PointHistory.vue';
import YouTube from '@/components/YouTube.vue';

export default {
  name: "Navi",
  data() {
    return {
      isLoggedIn: false, // 仮のログイン状態。テスト用に切り替え可能
    };
  },
  methods: {
    // ロゴをクリックした時にトップページに遷移
    goToHome() {
      this.$router.push("/");
    },

    // 依頼するボタンをクリックした時にTokoページに遷移
    goToToko() {
      this.$router.push("/Toko");
    },

    // ログイン状態を切り替える
    toggleLogin() {
      this.isLoggedIn = !this.isLoggedIn;
    },

    // ログアウト処理（仮の処理）
    logout() {
      this.isLoggedIn = false;
      alert("ログアウトしました");
      this.$router.push("/");
    },
  },
  components: {
    RealTimeClock,
    PointHistory, // PointHistory コンポーネントをインポート
  },
};
</script>

<template>
  <header class="nav">
    <!-- サイトロゴ（クリックでトップページへ遷移） -->
    <div class="logo" @click="goToHome">
      <img src="../assets/CC_logo.png" />
    </div>
    <!-- ナビゲーションメニュー -->
    <nav class="nav-links">
      <router-link to="/">
        <button class="btn1">Home</button>
      </router-link>

      <router-link to="/list">
        <button class="btn1">依頼一覧</button>
      </router-link>

      <!-- ログイン状態に応じて表示切り替え -->
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

      <router-link to="/info">
        <button class="btn1">当サイトについて</button>
      </router-link>

      <router-link to="/FAQ">
        <button class="btn1">FAQ</button>
      </router-link>
    </nav>

    <RealTimeClock />

    <!-- 依頼するボタン -->
    <div>
      <button class="btn1" @click="goToToko">依頼する</button>
    </div>
  </header>

  <!-- ポイント履歴（直接表示） -->
  <div v-if="isLoggedIn" class="point-history">
    <h3>現在の保有ポイント</h3>
    <p>1000ポイント</p> <!-- 仮のポイント値 -->

    <h3>ポイント履歴</h3>
    <PointHistory /> <!-- ここでポイント履歴を直接表示 -->
  </div>

  <!-- テスト用のログイン切り替えボタン -->
  <div>
    <button class="btn2" @click="toggleLogin">
      {{ isLoggedIn ? "ログイン状態をオフにする" : "ログイン状態をオンにする" }}
    </button>
  </div>
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

/* テスト用ボタンのスタイル */
.btn2 {
  font-family: "Zen Maru Gothic", serif;
  background-color: #007bff;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
}

.btn2:hover {
  background-color: #0056b3;
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

/* レスポンシブデザイン */
@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    flex-direction: column;
    gap: 0.5rem;
  }

  div {
    flex-direction: column;
  }
}
</style>
