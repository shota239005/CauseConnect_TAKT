<script setup>
import { defineEmits, ref } from 'vue';

// 親コンポーネントへcloseイベントを送る
const emit = defineEmits(['close']);

// 入力されたポイントを格納する変数
const points = ref('');

// 閉じるボタンのクリック処理
const handleClose = () => {
  emit('close');
};

// 確定ボタンのクリック処理
const handleConfirm = () => {
  // 入力されたポイントが100以上かどうかをチェック
  if (parseInt(points.value) >= 100) {
    emit('close'); // ポイントが有効な場合、ポップアップを閉じる
  } else {
    alert('100ポイント以上で参加できます。');
  }
};
</script>

<template>
  <!-- 半透明の背景 -->
  <div class="overlay" @click="handleClose">
    <!-- ポップアップコンテンツ -->
    <div class="jikko-popup" @click.stop>
      <h1>出資者で参加するには、１００ポイント以上から参加できます。</h1>

      <!-- ポイント入力フォーム -->
      <form>
        <label for="points">ポイント：</label>
        <input type="number" id="points" v-model="points" placeholder="ポイントを入力" />
      </form>

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
  max-width: 600px;
  width: 90%;
}

h1 {
  font-size: 20px;
  margin-bottom: 20px;
}

form {
  margin-bottom: 20px;
}

input[type="number"] {
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 10px;
  margin-right: 40px ;
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.close-button,
.jikko {
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

.jikko {
  padding: 20px 40px;
}

.close-button:hover {
  background-color: #d32f2f;
  color: white;
}
</style>
