<script setup>
import { ref } from 'vue';

const emit = defineEmits(['update-parent']);
const isPopupVisible = ref(false); // ポップアップの表示フラグ

// ポップアップの表示/非表示を切り替える
const togglePopup = () => {
    isPopupVisible.value = !isPopupVisible.value;
};
</script>

<template>
    <div>
        <!-- ポップアップ表示ボタン -->
        <button @click="togglePopup" class="purchase-button">
            ポイント交換
        </button>

        <!-- ポップアップ -->
        <div v-if="isPopupVisible" class="popup-overlay" @click="togglePopup">
            <div class="popup-container" @click.stop>
                <h2>ポイント交換</h2>
                <p>イメージ画像：</p>

                <!-- 画像表示 -->
                <img src="@/assets/img/point_kokanCP.png" alt="購入方法の説明" class="demo-image" />

                <div class="button-group">
                    <button @click="togglePopup" class="confirm-button">閉じる</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* ボタン横並びスタイル */
.button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}
/* ポップアップのスタイル */
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.popup-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-height: 500px;
    text-align: center;
    overflow-y: auto;
}

.demo-image {
    width: 100%;
    height: auto;
    margin-top: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.purchase-button{
    font-family: "Zen Maru Gothic", serif;
    background-color: #f7a400;
    color: white;
    border: none;
    padding: 10px 100px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 32px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.confirm-button{
    font-family: "Zen Maru Gothic", serif;
    background-color: #f7a400;
    color: white;
    border: none;
    padding: 10px 40px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 24px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.cancel-button{
  font-family: "Zen Maru Gothic", serif;
  background-color: #808080;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 24px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.purchase-button::before {
    content: "🔄";
    font-size: 32px;
}

.purchase-button:hover,
.confirm-button:hover,
.cancel-button:hover {
    background-color: #ffca5f;
    transform: scale(1.05);
}

.message {
    color: green;
    margin-top: 10px;
}
</style>
