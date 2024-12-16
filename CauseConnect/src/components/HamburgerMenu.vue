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
        <li><a @click="goToHome">Home</a></li>
        </router-link>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
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
  height: 50vh;
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

</style>
