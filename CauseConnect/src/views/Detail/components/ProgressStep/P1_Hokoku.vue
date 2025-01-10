<script setup>
import { ref } from "vue";
import PhotoUploaderGroup from "@/views/Toko/components/PhotoUploaderGroup.vue";
import apiClient from '@/axios'; // axios設定をインポート

// 初期データ
const uploaders = [
  { pictureType: 3, label: "参加者写真" },
  { pictureType: 4, label: "依頼場所写真" },
  { pictureType: 5, label: "実行前写真" },
  { pictureType: 6, label: "実行後写真" },
];

// 画像データを管理
const photos = ref([]); // { pictureType, file } を配列で保持

// コメントデータ
const comments = ref({
  comment1: "これは参加者コメントのテストです", // 参加者コメント
  comment2: "これは依頼場所コメントのテストです", // 依頼場所コメント
  comment3: "これは実行前コメントのテストです", // 実行前コメント
  comment4: "これは実行後コメントのテストです", // 実行後コメント
});

// 画像が更新されたら呼ばれる
const handlePhotosUpdated = ({ pictureType, file }) => {
  const existingIndex = photos.value.findIndex((item) => item.pictureType === pictureType);
  if (existingIndex !== -1) {
    photos.value[existingIndex].file = file; // 上書き
  } else {
    photos.value.push({ pictureType, file });
  }
};

// 保存処理
const handleSubmit = async () => {
  const formData = new FormData();
  formData.append("case_id", 35); // テスト用の依頼ID

  // 写真をフォームに追加
  photos.value.forEach(({ pictureType, file }) => {
    formData.append(`photos[${pictureType}]`, file); // バックエンド側で処理
  });

  // コメントをフォームに追加
  Object.keys(comments.value).forEach((key) => {
    formData.append(key, comments.value[key]);
  });

  try {
    const response = await apiClient.post("/request-report", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("保存成功:", response.data);
    alert("保存が成功しました！");
  } catch (error) {
    console.error("保存エラー:", error);
    alert("保存に失敗しました。");
  }
};
</script>

<template>
  <div>
    <PhotoUploaderGroup :uploaders="uploaders" @photosUpdated="handlePhotosUpdated" />

    <div>
      <label>参加者コメント</label>
      <textarea v-model="comments.comment1"></textarea>

      <label>依頼場所コメント</label>
      <textarea v-model="comments.comment2"></textarea>

      <label>実行前コメント</label>
      <textarea v-model="comments.comment3"></textarea>

      <label>実行後コメント</label>
      <textarea v-model="comments.comment4"></textarea>
    </div>

    <button @click="handleSubmit">保存</button>
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
  color: #333;
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

.section-btn{
  text-align: right;
}

.btn1{
  padding: 20px 70px;
  color: #333;
  font-size: 30px;
  font-weight: 500;
  transition: transform 0.3s, box-shadow 0.3s;
}
</style>
