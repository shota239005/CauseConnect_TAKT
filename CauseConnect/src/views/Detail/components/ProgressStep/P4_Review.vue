<script setup>
import { ref } from 'vue';

// 仮の参加者データ
const participants = ref([
  { id: 1, name: '参加者1', review: null }, 
  { id: 2, name: '参加者2', review: null },
  { id: 3, name: '参加者3', review: null }
]);

// レビューが確定したかどうか
const isConfirmed = ref(false);

// レビューの変更処理
const updateReview = (participantId, review) => {
  const participant = participants.value.find(p => p.id === participantId);
  if (participant) {
    participant.review = review;
  }
};

// 確定処理
const confirmReviews = () => {
  // すべての参加者にレビューがついているかチェック
  const allReviewed = participants.value.every(p => p.review !== null);
  if (allReviewed) {
    isConfirmed.value = true;
    alert('レビューが確定しました');
    // ここでレビューを送信する処理（API呼び出しなど）を追加できます。
  } else {
    alert('すべての参加者のレビューを選択してください');
  }
};
</script>

<template>
  <div class="review-container">
    <h3>進行度4: 参加者レビュー</h3>

    <div v-for="participant in participants" :key="participant.id" class="participant">
      <h4>{{ participant.name }}</h4>

      <div class="review-buttons">
        <button 
          @click="updateReview(participant.id, 'good')" 
          :class="{ selected: participant.review === 'good' }">
          よかった！
        </button>
        <button 
          @click="updateReview(participant.id, 'bad')" 
          :class="{ selected: participant.review === 'bad' }">
          う～ん
        </button>
      </div>
    </div>

    <button 
      @click="confirmReviews" 
      :disabled="isConfirmed" 
      class="confirm-button">
      確定
    </button>

    <p v-if="isConfirmed" class="confirmation-message">レビューは確定済みです。</p>
  </div>
</template>

<style scoped>
.review-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.participant {
  margin-bottom: 20px;
}

.review-buttons {
  display: flex;
  gap: 10px;
}

.review-buttons button {
  padding: 10px 20px;
  background-color: #f7a400;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.review-buttons button.selected {
  background-color: #4caf50;
}

.review-buttons button:hover {
  background-color: #feb626;
}

.confirm-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.confirmation-message {
  margin-top: 20px;
  color: green;
  text-align: center;
}
</style>
