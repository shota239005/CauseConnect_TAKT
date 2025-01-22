<script setup>
import { ref, onMounted } from "vue";
import apiClient from '@/axios';  // ✅ axiosインスタンスのインポート

// ✅ 親から受け取るprops（caseIdを動的に受け取る）
const props = defineProps({
  caseId: {
    type: [Number, String],
    required: true,
  },
});
onMounted(() => {
  // console.log("[P1] 受け取ったcase_id:", props.caseId);
});

// ✅ 参加者のレビュー情報
const participants = ref([
  { id: 1, name: 'ミドル', review: 0 },
  { id: 2, name: 'よし', review: 0 },
  { id: 3, name: 'さつき', review: 0 },
  { id: 4, name: 'みの', review: 0 },
]);

const isConfirmed = ref(false);
const error = ref(null);
const successMessage = ref(null);

// ✅ 参加者のレビュー更新
const updateReview = (participantId, stars) => {
  const participant = participants.value.find(p => p.id === participantId);
  if (participant) {
    participant.review = stars;
  }
};

// ✅ state_idを4に更新する関数（評価完了）
const updateStateToReviewed = async () => {
  try {
    const response = await apiClient.put(`/case/${props.caseId}/update-state`, {
      state_id: 4  // ✅ state_idを4（評価完了）に更新
    });
    console.log("評価成功: state_idが4に更新されました", response.data);
    successMessage.value = "評価が完了しました！";
  } catch (err) {
    console.error("評価エラー: state_idの更新に失敗しました", err);
    error.value = "state_idの更新に失敗しました。再度お試しください。";
  }
};

// ✅ レビュー確定処理（全員がレビュー済みならstate_idを更新）
const confirmReviews = async () => {
  const allReviewed = participants.value.every(p => p.review > 0);
  if (allReviewed) {
    isConfirmed.value = true;
    alert('レビューが確定しました');

    // ✅ state_idを4に更新
    await updateStateToReviewed();
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
        評価
      </button>
    </div>

    <p v-if="isConfirmed" class="confirmation-message">レビューは確定済みです。</p>
    <p v-if="error" class="error-message">{{ error }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
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

.btn1 {
  width: 200px;
  font-size: 30px;
  padding: 20px 20px;
  border-radius: 5px;
  cursor: pointer;
  color: #333;
}


.btn1:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.confirmation-message {
  color: green;
  font-weight: bold;
  margin-top: 20px;
}

.error-message {
  color: #d9534f;
  font-weight: bold;
  margin-top: 20px;
}

.success-message {
  color: #28a745;
  font-weight: bold;
  margin-top: 20px;
}
</style>
