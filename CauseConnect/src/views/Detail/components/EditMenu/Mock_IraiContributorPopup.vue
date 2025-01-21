
<script>
import IraiContributorPopup from "./IraiContributorPopup.vue"; // 作成したポップアップをインポート

export default {
  name: "TestPopup",
  components: { IraiContributorPopup },
  data() {
    return {
      isPopupVisible: false, // ポップアップの表示状態
      mockIraiPoint: 400, // モックデータ：現在のポイント
      mockBalancePoints: 1000, // モックデータ：保有ポイント
    };
  },
  methods: {
    showPopup() {
      this.isPopupVisible = true; // ポップアップを表示
    },
    hidePopup() {
      this.isPopupVisible = false; // ポップアップを非表示
    },
  },
};
</script>

<template>
  <div>
    <!-- モックデータを表示するボタン -->
    <button @click="showPopup">ポイントを追加する</button>

    <!-- ポップアップコンポーネント -->
    <IraiContributorPopup
      :is-visible="isPopupVisible"
      :irai-point="mockIraiPoint"
      :balance-points="mockBalancePoints"
      @close="hidePopup"
    />
  </div>
</template>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px;
}

button:hover {
  background-color: #0056b3;
}
</style>
