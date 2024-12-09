<script setup>
import { ref } from 'vue';

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

const isApproved = ref(null);

const handleApproval = (status) => {
  isApproved.value = status;
};
</script>

<template>
  <div class="progress-step3">
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

    <div class="approval-buttons">
      <button class="btnNo"
        @click="handleApproval(false)"
        :class="{'selected': isApproved === false}">
        非承認
      </button>
      <button class="btn1"
        @click="handleApproval(true)"
        :class="{'selected': isApproved === true}">
        承認
      </button>
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
  text-align: right;
  margin-top: 20px;
}

.approval-buttons button {
  margin-right: 10px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
}

.btnNo {
  padding: 20px 40px;
  color: #333;
  font-size: 30px;
  transition: transform 0.3s, box-shadow 0.3s;
}
.btn1{
  padding: 20px 60px;
  color: #333;
  font-size: 30px;
  font-weight: 500;
  transition: transform 0.3s, box-shadow 0.3s;
}


.btn1:hover, .btn1.selected {
  color: #333;
  background-color: #ff8c00;
  box-shadow: 0 0 0;
  transform: translate(5px, 5px);
}

.btnNo:hover, .btnNo.selected {
  background-color: #4b2ddd;
  color: #fff;
  box-shadow: 0 0 0;
  transform: translate(5px, 5px);
}

h3 {
  color: #333;
}
</style>
