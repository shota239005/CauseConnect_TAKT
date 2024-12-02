<script setup>
import { ref } from 'vue';

// 仮のデータ（進行度2で提供されたデータ）
const providedData = ref({
  participantsPhoto: 'path_to_participants_photo.jpg',
  participantsComment: '参加者からのコメントがここに表示されます。',
  locationPhoto: 'path_to_location_photo.jpg',
  locationComment: '依頼場所に関するコメントがここに表示されます。',
  beforeExecutionPhoto: 'path_to_before_execution_photo.jpg',
  beforeExecutionComment: '実行前のコメントがここに表示されます。',
  afterExecutionPhoto: 'path_to_after_execution_photo.jpg',
  afterExecutionComment: '実行後のコメントがここに表示されます。',
});

// 承認状態（仮の状態）
const isApproved = ref(null); // null = 未選択, true = 承認, false = 非承認

// 承認・非承認ボタンの処理
const handleApproval = (status) => {
  isApproved.value = status;
};
</script>

<template>
  <div class="progress-step3">
    <h2>進行度3: 承認フェーズ</h2>

    <!-- 進行度2で提供されたデータの表示 -->
    <div class="data-section">
      <h3>参加者の写真とコメント</h3>
      <img :src="providedData.participantsPhoto" alt="参加者の写真" width="200" />
      <p>{{ providedData.participantsComment }}</p>

      <h3>依頼場所の写真とコメント</h3>
      <img :src="providedData.locationPhoto" alt="依頼場所の写真" width="200" />
      <p>{{ providedData.locationComment }}</p>

      <h3>実行前の写真とコメント</h3>
      <img :src="providedData.beforeExecutionPhoto" alt="実行前の写真" width="200" />
      <p>{{ providedData.beforeExecutionComment }}</p>

      <h3>実行後の写真とコメント</h3>
      <img :src="providedData.afterExecutionPhoto" alt="実行後の写真" width="200" />
      <p>{{ providedData.afterExecutionComment }}</p>
    </div>

    <!-- 承認・非承認ボタン -->
    <div class="approval-buttons">
      <button @click="handleApproval(true)" :class="{'active': isApproved === true}">承認</button>
      <button @click="handleApproval(false)" :class="{'active': isApproved === false}">非承認</button>
    </div>

    <p v-if="isApproved !== null">
      承認結果: {{ isApproved ? '承認済み' : '非承認' }}
    </p>
  </div>
</template>

<style scoped>
.progress-step3 {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
}

.data-section {
  margin-bottom: 20px;
}

.data-section h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.data-section img {
  margin-bottom: 10px;
}

.approval-buttons {
  margin-top: 20px;
}

.approval-buttons button {
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #ffcb60;
  border: none;
}

.approval-buttons button:hover {
  background-color: #feb626;
}

.approval-buttons .active {
  background-color: #4caf50;
}

.approval-buttons button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
