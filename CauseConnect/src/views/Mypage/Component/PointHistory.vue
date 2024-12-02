<script setup>
import { ref } from 'vue';

// ポイント履歴のサンプルデータ（サーバーから取得する場合、APIを使用）
const currentPoints = ref(1200); // 現在の保有ポイント

// 過去の取引履歴（仮のデータ）
const transactionHistory = ref([
  {
    id: 1,
    type: "購入",
    points: 500,
    totalPoints: 1500,
    date: "2024-11-01 10:30:00",
  },
  {
    id: 2,
    type: "交換",
    points: -200,
    totalPoints: 1300,
    date: "2024-11-10 15:00:00",
  },
  {
    id: 3,
    type: "出資",
    points: -300,
    totalPoints: 1000,
    date: "2024-11-15 09:45:00",
  },
  {
    id: 4,
    type: "報酬",
    points: 200,
    totalPoints: 1200,
    date: "2024-11-20 14:00:00",
  },
]);

// ポップアップを表示するかどうかのフラグ
const isPopupVisible = ref(false);

// ポップアップの表示/非表示をトグル
const togglePopup = () => {
  isPopupVisible.value = !isPopupVisible.value;
};
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
        <h3>現在の保有ポイント</h3>
        <p class="points-value">{{ currentPoints }} ポイント</p>
      </div>

      <!-- 過去の取引履歴 -->
      <div class="transaction-history">
        <h3>取引履歴</h3>
        <ul>
          <li v-for="transaction in transactionHistory" :key="transaction.id" class="transaction-item">
            <div>
              <strong>{{ transaction.type }}</strong> |
              <span>{{ transaction.date }}</span>
            </div>
            <div>
              <span :class="{'positive': transaction.points > 0, 'negative': transaction.points < 0}">
                {{ transaction.points > 0 ? `+${transaction.points}` : transaction.points }}
              </span>
              <span> 合計: {{ transaction.totalPoints }} ポイント</span>
            </div>
          </li>
        </ul>
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
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.show-history-button:hover {
  background-color: #45a049;
}
</style>
