<template>
  <div>
    <!-- ボタン -->
    <button @click="showPopup = true">ポップアップを表示</button>

    <!-- ポップアップ（モーダル） -->
    <div v-if="showPopup" class="modal-overlay" @click.self="closePopup">
      <div class="modal-content">
        <h2>ポップアップ画面</h2>
        <p>ここに内容を追加できます。</p>
        <button @click="closePopup">閉じる</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false, // ポップアップの表示状態
    };
  },
  methods: {
    closePopup() {
      this.showPopup = false;
    },
  },
};
</script>

<style scoped>
/* モーダルの背景 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* モーダルのコンテンツ */
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}
</style>
