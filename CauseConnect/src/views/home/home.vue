<script setup>
import { ref } from 'vue';  // refをインポート
import { useRouter } from 'vue-router';  // vue-routerをインポート
import Search from '@/components/search.vue';
import Japan from '@/components/japan.vue';
import ImageSlide from './Component/ImageSlide.vue';
import ImageSlideTow from './Component/ImageSlideTow.vue';
import Info from '../Info/Info.vue';

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
    <h1 style="text-align: center; margin-top: 50px; color: #333;">  何かを学ぶのに、自分自身で経験する以上に良い方法はない。<br>～アルベルト・アインシュタイン～</h1>
      <!-- Searchコンポーネントの使用 -->
      <div class="search">
        <Search v-model:searchQuery="searchQuery" @search="searchRequests" />
      </div>
    </div>
    <ImageSlide/>
    <Japan/>
    <ImageSlideTow/>
    <Info/>
  </div>
</template>

<style scoped>
/* 必要に応じてスタイルを追加 */
.background-container {
  position: relative; /* 擬似要素を背景として配置するために必要 */
  width: 100%;
  height: 400px; /* 背景の高さ */
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
  margin-top: -50px;
  position: relative; /* 背景擬似要素に影響されないようにする */
  z-index: 1; /* 背景より前面に配置 */

}

/* スマホ向け（600px以下） */
@media screen and (max-width: 600px) {
  body {
    font-size: 10px;
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
