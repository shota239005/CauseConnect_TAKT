<script setup>
import Navi from './components/Nav.vue'; // ナビゲーションバーコンポーネントをインポート
import CopyLight from '@/components/CopyLight.vue';

</script>

<template>

    <div id="app">
      <!-- ナビゲーションバー（常に表示） -->
      <Navi />
      <!-- ここにページ遷移によって切り替わるコンテンツを表示 -->
      <router-view/> <!-- 遷移先のコンテンツが表示されます -->

    </div>
    <CopyLight/>

  </template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=Zen+Maru+Gothic&display=swap');

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
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

  /* 必要に応じてスタイルを追加 */
  </style>

