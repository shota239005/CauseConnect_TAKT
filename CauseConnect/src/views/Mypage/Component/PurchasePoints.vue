<script setup>
import { ref } from 'vue';
import apiClient from "@/axios"; // axios 設定をインポート
const emit = defineEmits(['update-parent']);
const isPopupVisible = ref(false); // ポップアップの表示フラグ
const pointsToPurchase = ref(0); // 購入ポイント数
const message = ref(''); // フィードバックメッセージ

// ポップアップの表示/非表示を切り替える
const togglePopup = () => {
    isPopupVisible.value = !isPopupVisible.value;
};

// ポイント購入処理
const purchasePoints = async () => {
    try {
        const response = await apiClient.post('/points/purchase', { points: pointsToPurchase.value });

        message.value = response.data.message;
        pointsToPurchase.value = 0; // フォームをリセット
        // 親コンポーネントに更新通知を送る
        emit('update-parent'); // カスタムイベントを発火
    } catch (error) {
        console.error('購入エラー:', error.response?.data || error);
        message.value = error.response?.data?.message || 'ポイント購入中にエラーが発生しました。';
    }
};
</script>

<template>
    <div>
        <!-- ポップアップ表示ボタン -->
        <button @click="togglePopup" class="purchase-button">
            ポイント購入
        </button>

        <!-- ポップアップ -->
        <div v-if="isPopupVisible" class="popup-overlay" @click="togglePopup">
            <div class="popup-container" @click.stop>
                <h2>ポイント購入</h2>

                <!-- 購入ポイント入力 -->
                <label for="points">購入するポイント数:</label>
                <input id="points" v-model.number="pointsToPurchase" type="number" placeholder="購入ポイント数を入力" min="1" />

                <!-- メッセージ表示 -->
                <p v-if="message" class="message">{{ message }}</p>

                <!-- ボタン -->
                <div class="button-group">
                    <button @click="purchasePoints" class="confirm-button">購入する</button>
                    <button @click="togglePopup" class="cancel-button">キャンセル</button>
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

.purchase-button,
.confirm-button
{
    background-color: #f7a400;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}
.cancel-button
{
    background-color: #808080;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.purchase-button::before {
    content: "💰";
    font-size: 20px;
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
