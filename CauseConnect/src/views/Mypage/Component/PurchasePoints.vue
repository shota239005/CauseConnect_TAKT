<script setup>
import { ref } from 'vue';
import apiClient from "@/axios"; // axios 設定をインポート

const emit = defineEmits(['update-parent']);
const isPopupVisible = ref(false); // 購入ポップアップの表示フラグ
const isPaymentPopupVisible = ref(false); // 決済ポップアップの表示フラグ
const pointsToPurchase = ref(0); // 購入ポイント数
const message = ref(''); // フィードバックメッセージ

// ポップアップの表示/非表示を切り替える
const togglePopup = () => {
    isPopupVisible.value = !isPopupVisible.value;
};

// 決済ポップアップの表示/非表示を切り替える
const togglePaymentPopup = () => {
    isPaymentPopupVisible.value = !isPaymentPopupVisible.value;
};

// ポイント購入処理
const purchasePoints = async () => {
    try {
        const response = await apiClient.post('/points/purchase', { points: pointsToPurchase.value });

        message.value = response.data.message;
        pointsToPurchase.value = 0; // フォームをリセット
        emit('update-parent'); // 親コンポーネントに更新通知
        togglePopup(); // 購入ポップアップを閉じる
        togglePaymentPopup(); // 決済ポップアップを開く
    } catch (error) {
        console.error('購入エラー:', error.response?.data || error);
        message.value = error.response?.data?.message || 'ポイント購入中にエラーが発生しました。';
    }
};

// 決済ポップアップを閉じる処理 + ページをリロード
const closePaymentPopupAndReload = () => {
    isPaymentPopupVisible.value = false; // ポップアップを閉じる
    window.location.reload(); // ページをリロード
};
</script>

<template>
    <div>
        <!-- ポップアップ表示ボタン -->
        <button @click="togglePopup" class="purchase-button">
            ポイント購入
        </button>

        <!-- 購入ポップアップ -->
        <div v-if="isPopupVisible" class="popup-overlay" @click="togglePopup">
            <div class="popup-container" @click.stop>
                <h2>ポイント購入</h2>
                <label for="points">購入するポイント数:</label>
                <input id="points" v-model.number="pointsToPurchase" type="number" placeholder="購入ポイント数を入力" min="1" />

                <p v-if="message" class="message">{{ message }}</p>

                <div class="button-group">
                    <button @click="purchasePoints" class="confirm-button">次へ</button>
                    <button @click="togglePopup" class="cancel-button">キャンセル</button>
                </div>
            </div>
        </div>

        <!-- 決済ポップアップ -->
        <div v-if="isPaymentPopupVisible" class="popup-overlay" @click="closePaymentPopupAndReload">
            <div class="popup-container2" @click.stop>
                <h2>ポイント購入方法</h2>
                <p>以下の画像で購入方法を確認してください：</p>

                <!-- 画像表示 -->
                <img src="@/assets/img/point-buy.png" alt="購入方法の説明" class="demo-image" />

                <div class="button-group">
                    <button @click="closePaymentPopupAndReload" class="confirm-button">閉じる</button>
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

.popup-container2 {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 800px;
    max-height: 500px;
    text-align: center;
    overflow-y: auto;
}


.purchase-button {
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

.confirm-button {
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

.cancel-button {
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
