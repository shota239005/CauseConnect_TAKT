<script setup>
import { ref } from 'vue';

const participants = ref([
  { id: 1, name: 'さっちゃん', review: null },
  { id: 2, name: 'がまかつ', review: null },
  { id: 3, name: 'ガープ', review: null },
  { id: 4, name: 'ヒナ', review: null }
]);

const isConfirmed = ref(false);

const updateReview = (participantId, review) => {
  const participant = participants.value.find(p => p.id === participantId);
  if (participant) {
    participant.review = review;
  }
};

const confirmReviews = () => {
  const allReviewed = participants.value.every(p => p.review !== null);
  if (allReviewed) {
    isConfirmed.value = true;
    alert('レビューが確定しました');
  } else {
    alert('すべての参加者のレビューを選択してください');
  }
};

const isClicked = ref(false); // クリック状態を管理

const handleButtonClick = () => {
  if (!isConfirmed.value) {
    isClicked.value = true; // ボタンがクリックされた状態にする
  }
};
</script>

<template>
  <div class="review-container">
    <h2>依頼全体を通して参加者達の評価をお願いします</h2>

    <div v-for="participant in participants" :key="participant.id" class="participant">
      <h4>{{ participant.name }}</h4>
      <div class="review-buttons">
        <button
          class="btn1"
          @click="updateReview(participant.id, 'good')"
          :class="{ selected: participant.review === 'good' }"
        >
          よかった！
        </button>
        <button
          class="btnNo"
          @click="updateReview(participant.id, 'bad')"
          :class="{ selected: participant.review === 'bad' }"
        >
          う～ん
        </button>
      </div>
    </div>

    <div class="check">
      <button
        class="check-btn"
        @click="() => { handleButtonClick(); confirmReviews(); }"
        :class="{ clicked: isClicked }"
        :disabled="isConfirmed"
      >
        確定
      </button>
    </div>

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

.btn1,.btnNo {
  color: #333;
  font-size: 20px;
  font-weight: 900;
}
.review-buttons {
  display: flex;
  gap: 10px;
}

.btn1.selected {
  color: #333;
  background-color: #ff8c00;
  box-shadow: 0 0 0;
  transform: translate(5px, 5px);
}

.btnNo.selected {
  background-color: #4b2ddd;
  color: #fff;
  box-shadow: 0 0 0;
  transform: translate(5px, 5px);

}

.check {
  text-align: right;
}

.check-btn {
  font-family: "Zen Maru Gothic", serif;
  text-align: right;
  background-color: #ffcb60;
  color: #333;
  border: none;
  padding: 20px 70px;
  font-size: 40px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  box-shadow: 5px 5px 0 #ff8c00;
}

.check-btn.clicked, /* クリックされたときのスタイル */
.check-btn:hover {
  color: #333;
  background-color: #ff8c00;
  box-shadow: 0 0 0;
  transform: translate(5px, 5px);
}
</style>
