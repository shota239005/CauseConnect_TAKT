<script setup>
import Navi from './components/Nav.vue'; // ナビゲーションバーコンポーネントをインポート
import YouTube from './components/YouTube.vue';
</script>

<template>

    <div id="app">
      <!-- ナビゲーションバー（常に表示） -->
      <Navi />
      <YouTube videoId="1GFb-6UHFuE" />
      <!-- ここにページ遷移によって切り替わるコンテンツを表示 -->
      <router-view/> <!-- 遷移先のコンテンツが表示されます -->

    </div>

  </template>

  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=Zen+Maru+Gothic&display=swap');

  html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

  /* 必要に応じてスタイルを追加 */
  </style>

