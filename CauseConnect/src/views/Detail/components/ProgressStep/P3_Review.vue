<script setup>
import { ref } from 'vue';

const participants = ref([
  { id: 1, name: 'さっちゃん', review: 0 },
  { id: 2, name: 'がまかつ', review: 0 },
  { id: 3, name: 'ガープ', review: 0 },
  { id: 4, name: 'ヒナ', review: 0 },
]);

const isConfirmed = ref(false);

const updateReview = (participantId, stars) => {
  const participant = participants.value.find(p => p.id === participantId);
  if (participant) {
    participant.review = stars;
  }
};

const confirmReviews = () => {
  const allReviewed = participants.value.every(p => p.review > 0);
  if (allReviewed) {
    isConfirmed.value = true;
    alert('レビューが確定しました');
  } else {
    alert('すべての参加者のレビューを選択してください');
  }
};
</script>

<template>
  <div class="review-container">
    <h2>依頼全体を通して参加者達の評価をお願いします</h2>

    <div v-for="participant in participants" :key="participant.id" class="participant">
      <h4>{{ participant.name }}</h4>
      <div class="star-rating">
        <span
          v-for="star in 5"
          :key="star"
          class="star"
          :class="{ selected: star <= participant.review }"
          @click="updateReview(participant.id, star)"
        >
          ★
        </span>
      </div>
    </div>

    <div class="check">
      <button
        class="btn1"
        @click="confirmReviews"
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

.star-rating {
  display: flex;
  gap: 5px;
  cursor: pointer;
}

.star {
  font-size: 24px;
  color: #ccc;
  transition: color 0.3s;
}

.star.selected {
  color: #ffc107;
}

.check {
  text-align: right;
}

.btn1{
  width: 190px;
  font-size: 30px;
  color: #333;
}


.check-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.confirmation-message {
  color: green;
  font-weight: bold;
}
</style>
