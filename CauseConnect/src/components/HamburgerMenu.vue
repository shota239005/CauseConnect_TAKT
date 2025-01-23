<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
        // ログアウト処理
        logout() {
      localStorage.removeItem('token'); // トークンを削除
      this.isLoggedIn = false;
      this.user = null;
      alert('ログアウトしました');
      window.location.href = '/'; // ログインページへリダイレクトしつつリロード
    },
  },
};
</script>

<template>
  <div>
    <!-- ハンバーガーボタン -->
    <button @click="toggleMenu" class="hamburger-btn">
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
      <span :class="{ open: isOpen }"></span>
    </button>

    <!-- メニュー項目 -->
    <nav :class="{ 'menu-open': isOpen }" class="menu">
      <ul>
        <router-link to="/">
          <li><a @click="goToHome">ホーム</a></li>
        </router-link>
        <router-link to="/list">
          <li><a href="#about">依頼一覧</a></li>
        </router-link>
        <router-link to="/login">
          <li><a href="#services">ログイン</a></li>
        </router-link>
        <router-link to="/FAQ">
          <li><a href="#contact">FAQ</a></li>
        </router-link>
        <router-link to="/info">
          <li><a href="#contact">当サイト/新規登録</a></li>
        </router-link>
        <li><a @click="logout">ログアウト</a></li>

      </ul>
    </nav>
  </div>
</template>


<style scoped>
/* ハンバーガーボタンのスタイル */
.hamburger-btn {
  position: relative; /* z-index が効くようにする */
  z-index: 10000; /* メニューより前面に表示 */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.hamburger-btn span {
  display: block;
  width: 30px;
  height: 3px;
  background-color: #f7a400;
  transition: transform 0.3s, opacity 0.3s;
}

.hamburger-btn span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-btn span.open:nth-child(2) {
  opacity: 0;
}

.hamburger-btn span.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* メニューのスタイル */
.menu {
  position: fixed; /* スクロールしてもメニューが固定される */
  top: 0;
  left: 0;
  /*height: 50vh;*/
  width: 100vw;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 9999; /* 他のコンポーネントよりも前面に表示 */
}

.menu-open {
  transform: translateX(0);
}

.menu ul {
  text-align: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu ul li {
  margin: 15px 0;
}

.menu ul li a {
  color: #eee;
  text-decoration: none;
  font-size: 1.5em;
  transition: color 0.3s;
}

.menu ul li a:hover {
  color: #f7a400;
}

/* スマホ向け（600px以下） */
@media screen and (max-width: 600px) {
  body {
    font-size: 14px;
    background-color: #fff;
  }

  #app {
    max-width: 100%; /* スマホでは幅いっぱいにする */
    padding: 10px; /* 画面の端に余白を追加 */
  }

  .faq-item {
    padding: 15px 20px; /* 左右の余白を狭くする */
  }

  .faq-title {
    font-size: 1.5rem; /* タイトルを少し小さめに */
  }

  .modal-content {
    width: 95%; /* 画面幅に合わせる */
    padding: 15px; /* 余白を少し減らす */
  }
}

</style>
