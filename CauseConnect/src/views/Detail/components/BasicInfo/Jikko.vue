<script setup>
import { defineEmits } from 'vue';

// 親コンポーネントへcloseイベントを送る
const emit = defineEmits(['close']);

// 閉じるボタンのクリック処理
const handleClose = () => {
  emit('close');
};

// 確定ボタンのクリック処理
const handleConfirm = () => {
  alert('実行者として参加しました！チャットで挨拶のコメントをしてみましょう！');
  emit('close'); // 確定後、ポップアップを閉じる
};
</script>

<template>
  <!-- 半透明の背景 -->
  <div class="overlay" @click="handleClose">
    <!-- ポップアップコンテンツ -->
    <div class="jikko-popup" @click.stop>
      <h1>"実行者で参加する"で間違いないですか？</h1>
      <div class="button-container">
        <button class="close-button" @click="handleClose">キャンセル</button>
        <button class="jikko" @click="handleConfirm">確定</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 半透明の背景 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明のグレー */
  z-index: 999; /* ポップアップより背面になるが、ページの最前面に */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ポップアップコンテンツ */
.jikko-popup {
  background-color: white;
  border: 2px solid #42b045;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

h1 {
  font-size: 20px;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.close-button,
.confirm-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-button {
  margin-right: 20px;
  background-color: white;
  border: 2px solid #d32f2f;
  color: red;
}

.jikko{
  padding: 20px 40px;
}

.close-button:hover {
  background-color: #d32f2f;
  color: white;
}

</style>
