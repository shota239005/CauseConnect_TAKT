<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/axios'; // axiosインスタンスをインポート

// 現在の保有ポイント
const currentPoints = ref(0);

// 過去の取引履歴を保持
const transactionHistory = ref([]);

// ポップアップを表示するかどうかのフラグ
const isPopupVisible = ref(false);

// ポップアップの表示/非表示をトグル
const togglePopup = () => {
  isPopupVisible.value = !isPopupVisible.value;
};

// データ取得
const fetchPointHistory = async () => {
  try {
    const response = await apiClient.get('/points/history'); // API呼び出し
    console.log('APIレスポンス:', response.data);

    // レスポンスデータを反映
    currentPoints.value = response.data.current_points || 0;
    transactionHistory.value = response.data.history || [];

    console.log('現在のポイント:', currentPoints.value);
    console.log('取引履歴:', transactionHistory.value);
  } catch (error) {
    console.error('ポイント履歴の取得に失敗:', error);
    currentPoints.value = 0;
    transactionHistory.value = [];
  }
};

// コンポーネントがマウントされたときにデータを取得
onMounted(fetchPointHistory);
</script>

<template>
  <!-- ポイント履歴のポップアップ -->
  <div v-if="isPopupVisible" class="popup-overlay" @click="togglePopup">
    <div class="popup-container" @click.stop>
      <div class="popup-header">
        <h2>ポイント履歴</h2>
        <button @click="togglePopup" class="close-button">✖</button>
      </div>

      <!-- 現在の保有ポイント -->
      <div class="current-points">
        <h2>現在の保有ポイント</h2>
        <p class="points-value">{{ currentPoints }} ポイント</p>
      </div>

      <!-- 過去の取引履歴 -->
      <div class="transaction-history">
        <h3>取引履歴</h3>
        <ul v-if="transactionHistory.length > 0">
          <li v-for="transaction in transactionHistory" :key="transaction.timestamp" class="transaction-item">
            <div>
              <strong>{{ transaction.description }}</strong> |
              <span>{{ transaction.timestamp }}</span>
            </div>
            <div>
              <span :class="{
                positive: transaction.points > 0,
                negative: transaction.points < 0,
              }">
                {{ transaction.points > 0 ? `+${transaction.points}` : transaction.points }}
              </span>
            </div>
          </li>
        </ul>
        <p v-else>取引履歴はありません。</p>
      </div>
    </div>
  </div>

  <!-- トリガーボタン（マイページ内でボタンをクリックすると表示） -->
  <button @click="togglePopup" class="show-history-button">ポイント履歴を見る</button>
</template>

<style scoped>
/* ポップアップ背景 */
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

/* ポップアップのコンテナ */
.popup-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-height: 500px;
  overflow-y: auto;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.current-points {
  text-align: center;
  margin-bottom: 20px;
}

.points-value {
  font-size: 32px;
  font-weight: bold;
}

.transaction-history {
  margin-top: 20px;
}

.transaction-item {
  margin-bottom: 10px;
}

.transaction-item strong {
  font-size: 16px;
}

.transaction-item span {
  font-size: 14px;
}

.positive {
  color: green;
}

.negative {
  color: red;
}

/* ボタン */
.show-history-button {
  background-color: #f7a400;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  margin-left: 20px;
}

.show-history-button:hover {
  background-color: #ffca5f;
}
</style>
