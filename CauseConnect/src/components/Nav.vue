<script>
import { ref } from 'vue';
import RealTimeClock from './RealTimeClock.vue';
import apiClient from '@/axios'; // Axiosインスタンスをインポート
import HamburgerMenu from './HamburgerMenu.vue';
import FavoPopup from '@/views/Favo/FavoPopup.vue';
import LoginView from '@/views/LoginForm/LoginView.vue'; // Login.vueをインポート
import GetAccount from '@/components/GetAccount.vue';

export default {
  name: "Navi",
  data() {
    return {
      isLoggedIn: false, // ログイン状態
      user: null, // ユーザー情報
      showFavoModal: false, // お気に入り一覧のモーダル表示状態
      showLoginModal: false, // ログインモーダル表示状態
      modalSize: '', // モーダルサイズを動的に設定するプロパティ
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
      window.location.href = '/'; // ログインページへリダイレクトしつつリロード
    },
    // ロゴをクリックした時にトップページに遷移
    goToHome() {
      this.$router.push("/");
    },
    // 依頼するボタンをクリックした時にTokoページに遷移
    goToToko() {
      this.$router.push("/Toko");
    },
    // お気に入り一覧のモーダルを開く
    openFavoModal() {
      this.modalSize = 'FavoPopup'; // お気に入り一覧モーダルのサイズ
      this.showFavoModal = true;
    },
    // ログインモーダルを開く
    openLoginModal() {
      this.modalSize = 'login'; // ログインモーダルのサイズ
      this.showLoginModal = true;
    },
    // モーダルを閉じる
    closeFavoModal() {
      this.showFavoModal = false;
    },
    closeLoginModal() {
      this.showLoginModal = false;
    }
  },
  components: {
    GetAccount,
    HamburgerMenu,
    FavoPopup,
    LoginView, // Loginコンポーネントを追加
  },
};
</script>

<template>
  <header class="nav">
    <!-- ハンバーガーメニュー（PC版では非表示） -->
    <div class="hamburger-menu">
      <HamburgerMenu />
    </div>

    <!-- サイトロゴ（クリックでトップページへ遷移） -->
    <div class="logo" @click="goToHome">
      <img src="../assets/CC_logo.png" />
    </div>

    <GetAccount class="getAccount" />

    <!-- リアルタイム時計
    <RealTimeClock class="real-time-clock" />
    -->

    <!-- ナビゲーションメニュー -->
    <nav class="nav-links">
      <router-link to="/">
        <button class="btn1">Home</button>
      </router-link>

      <router-link to="/list">
        <button class="btn1">依頼一覧</button>
      </router-link>

      <button class="btn1" @click="openFavoModal">お気に入り一覧</button>

      <router-link to="/FAQ">
        <button class="btn1">FAQ</button>
      </router-link>

      <!-- ログイン状態に応じて表示切り替え -->
      <div class="auth-buttons">
        <div v-if="isLoggedIn">
          <router-link to="/mypage">
            <button class="btn1">マイページ</button>
          </router-link>
          <button class="btn1" @click="logout">ログアウト</button>
        </div>

        <div v-else>
          <button class="btn1" @click="openLoginModal">ログイン</button> <!-- ログインボタンをポップアップ化 -->
          <router-link to="/register">
            <button class="btn1">新規登録</button>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- 依頼するボタン -->
    <div class="request-button">
      <button class="btn1" @click="goToToko">依頼する</button>
    </div>
  </header>

  <!-- お気に入り一覧モーダル -->
  <div v-if="showFavoModal" class="favo-modal">
    <div class="modal-content" :class="modalSize">
      <FavoPopup />
      <button class="close-btn" @click="closeFavoModal">×</button>
    </div>
  </div>

  <!-- ログインモーダル -->
  <div v-if="showLoginModal" class="login-modal">
    <div class="modal-content" :class="modalSize">
      <LoginView />
      <button class="close-btn" @click="closeLoginModal">×</button>
    </div>
  </div>
</template>

<style scoped>
/* ナビゲーションバー全体のスタイル */
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

/* モーダルのスタイル */
.favo-modal, .login-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 背景を暗くする */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  position: relative;
  background-color: #eee;
  padding: 40px;
  border-radius: 8px;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px; /* モーダルの最大幅を500pxに制限 */
  max-height: 700px; /* 高さを画面の90%以内に調整 */
  overflow-y: auto; /* コンテンツが多い場合スクロール */
}

/* 閉じるボタンのスタイル（右上に配置） */
.close-btn {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 60px;
  background-color: transparent;
  color: #333;
  border: none;
  padding: 0;
  cursor: pointer;
}

.close-btn:hover {
  color: #ff0000;
  background-color: transparent;
}

/* スマホサイズでの表示調整 */
@media (max-width: 844px) {
  .nav-links,
  .logo,
  .real-time-clock {
    display: none;
  }

  .hamburger-menu,
  .auth-buttons,
  .request-button {
    display: flex;
  }
}

/* PC版ではハンバーガーメニューを非表示 */
@media (min-width: 845px) {
  .hamburger-menu {
    display: none;
  }
}
</style>
