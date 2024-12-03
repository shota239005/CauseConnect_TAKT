<script setup>
import { ref } from 'vue';  // refをインポート
import { useRouter } from 'vue-router';  // vue-routerをインポート
import Search from '@/components/search.vue';
import Japan from '@/components/japan.vue';
import ImageSlide from '@/views/Home/Component/ImageSlide.vue';
import Juggler from '@/components/Juggler.vue';
import Movies from '@/components/Movies.vue';
// 検索クエリを保持するためのref
const searchQuery = ref('');
const router = useRouter();

// 検索ボタンがクリックされたときに呼ばれる関数
const searchRequests = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/list', query: { search: searchQuery.value } });
  }
};
</script>

<template>
  <div>
    <div class="background-container">
      <!-- Searchコンポーネントの使用 -->
      <div class="search">
        <Search v-model:searchQuery="searchQuery" @search="searchRequests" />
      </div>
    </div>
    <ImageSlide/>
    <Japan/>
    <ImageSlide/>
    <div>
      <h1>おまけコーナー</h1>
      <p>ここにはマル秘コンテンツが表示されています。</p>
    </div>
    <Juggler/>
    <Movies/>
  </div>
</template>

<style scoped>
/* 必要に応じてスタイルを追加 */
.background-container {
  position: relative; /* 擬似要素を背景として配置するために必要 */
  width: 100%;
  height: 300px; /* 背景の高さ */
  overflow: hidden; /* 擬似要素がはみ出さないようにする */
}
/* 背景画像を半透明にする */
.background-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/HomeImg.jpg'); /* 背景画像のパス */
  background-size: cover; /* 背景をコンテナにフィットさせる */
  background-position: bottom; /* 背景を下側に配置 */
  opacity: 0.5; /* 背景のみ半透明にする */
  z-index: -1; /* 子要素の後ろに配置 */
}

/* Searchコンポーネントのスタイル（必要なら調整可能） */
.search{
  position: relative; /* 背景擬似要素に影響されないようにする */
  z-index: 1; /* 背景より前面に配置 */

}

</style>
