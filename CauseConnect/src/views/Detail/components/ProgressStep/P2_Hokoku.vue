<script setup>
import { ref } from "vue";

// 参加者情報
const participantPhoto = ref(null);
const participantComment = ref("");

// 依頼場所情報
const locationPhoto = ref(null);
const locationComment = ref("");

// 実行前の情報
const beforePhoto = ref(null);
const beforeComment = ref("");

// 実行後の情報
const afterPhoto = ref(null);
const afterComment = ref("");

// 写真アップロード処理
const handlePhotoUpload = (event, targetRef) => {
  const file = event.target.files[0];
  if (file) {
    targetRef.value = URL.createObjectURL(file);
  }
};

// コメント送信処理
const handleCommentChange = (event, targetRef) => {
  targetRef.value = event.target.value;
};
</script>

<template>
  <div class="progress-step-container">
    <h2>進行度 2: 実行報告内容</h2>

    <!-- 参加者写真とコメント -->
    <div class="section">
      <h3>参加者の写真</h3>
      <input type="file" @change="handlePhotoUpload($event, participantPhoto)" />
      <div v-if="participantPhoto">
        <img :src="participantPhoto" alt="参加者の写真" class="uploaded-photo" />
      </div>
      <textarea v-model="participantComment" placeholder="参加者に関するコメントを入力してください"></textarea>
    </div>

    <!-- 依頼場所の写真とコメント -->
    <div class="section">
      <h3>依頼場所の写真</h3>
      <input type="file" @change="handlePhotoUpload($event, locationPhoto)" />
      <div v-if="locationPhoto">
        <img :src="locationPhoto" alt="依頼場所の写真" class="uploaded-photo" />
      </div>
      <textarea v-model="locationComment" placeholder="依頼場所に関するコメントを入力してください"></textarea>
    </div>

    <!-- 実行前の写真とコメント -->
    <div class="section">
      <h3>実行前の写真</h3>
      <input type="file" @change="handlePhotoUpload($event, beforePhoto)" />
      <div v-if="beforePhoto">
        <img :src="beforePhoto" alt="実行前の写真" class="uploaded-photo" />
      </div>
      <textarea v-model="beforeComment" placeholder="実行前に関するコメントを入力してください"></textarea>
    </div>

    <!-- 実行後の写真とコメント -->
    <div class="section">
      <h3>実行後の写真</h3>
      <input type="file" @change="handlePhotoUpload($event, afterPhoto)" />
      <div v-if="afterPhoto">
        <img :src="afterPhoto" alt="実行後の写真" class="uploaded-photo" />
      </div>
      <textarea v-model="afterComment" placeholder="実行後に関するコメントを入力してください"></textarea>
    </div>
  </div>
</template>

<style scoped>
.progress-step-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.section {
  margin-bottom: 30px;
}

h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

input[type="file"] {
  display: block;
  margin-bottom: 10px;
}

.uploaded-photo {
  max-width: 100%;
  max-height: 300px;
  margin-top: 10px;
}

textarea {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
}
</style>
