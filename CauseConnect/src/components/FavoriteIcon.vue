<script setup>
import { ref } from "vue";

// お気に入りの状態を管理するための状態
const isFavorite = ref(false);

// お気に入り状態を切り替える関数
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};
</script>

<template>
  <div @click="toggleFavorite" class="favorite-icon">
    <!-- お気に入りアイコン -->
    <span :class="isFavorite ? 'filled' : 'empty'">
      <!-- お気に入りがtrueなら塗りつぶされた星（★）、falseなら空の星（☆） -->
      {{ isFavorite ? '★' : '☆' }}
    </span>
  </div>
</template>

<style scoped>
.favorite-icon {
  font-size: 2rem; /* アイコンのサイズを大きく設定 */
  cursor: pointer; /* クリック可能にする */
}

.favorite-icon .filled {
  color: #ff8c00; /* 塗りつぶされた星の色（ゴールド） */
}

.favorite-icon .empty {
  color: gray; /* 空の星の色（グレー） */
}
</style>
