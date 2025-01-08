<script setup>
import { ref } from 'vue';
import apiClient from "@/axios"; // axios 設定をインポート

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
        const response = await apiClient.post('/api/points/purchase', { points: purchaseAmount.value });




        message.value = response.data.message;
        pointsToPurchase.value = 0; // フォームをリセット
    } catch (error) {
        console.error('購入エラー:', error.response?.data || error);
        message.value = 'ポイント購入中にエラーが発生しました。';
    }
};
</script>

<template>
    <div>
        <!-- ポップアップ表示ボタン -->
        <button @click="togglePopup" class="purchase-button">ポイント購入</button>

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
                <button @click="purchasePoints" class="confirm-button">購入する</button>
                <button @click="togglePopup" class="cancel-button">キャンセル</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    width: 300px;
    text-align: center;
}

.purchase-button,
.confirm-button,
.cancel-button {
    background-color: #f7a400;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.purchase-button:hover,
.confirm-button:hover,
.cancel-button:hover {
    background-color: #ffca5f;
}

.message {
    color: green;
    margin-top: 10px;
}
</style>
