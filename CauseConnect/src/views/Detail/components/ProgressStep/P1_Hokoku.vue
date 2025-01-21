<script setup>
import { ref, onMounted } from "vue";
import PhotoUploaderGroup from "@/views/Toko/components/PhotoUploaderGroup.vue";
import apiClient from '@/axios'; // axios設定をインポート

// ✅ 親から受け取るprops（caseId追加）
const props = defineProps({
  caseId: {
    type: [Number, String],
    required: true,
  },
});

// ✅ 受け取ったcaseIdをログに表示
onMounted(() => {
  // console.log("[P1] 受け取ったcase_id:", props.caseId);
});

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
  comment1: "予定通りに実行者が集まりました。", // 参加者コメント
  comment2: "依頼場所に関しては、にわかりにくい場所ではなかったです。", // 依頼場所コメント
  comment3: "周辺には様々なゴミが落ちていました。", // 実行前コメント
  comment4: "皆で楽しくゴミ拾いができ、ソフトパーク周辺のゴミは一掃できたと思います。", // 実行後コメント
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

// ✅ state_idを2に更新する関数
const updateStateToSubmitted = async () => {
  try {
    const response = await apiClient.put(`/case/${props.caseId}/update-state`, {
      state_id: 2
    });
    console.log("[P1] state_id更新成功:", response.data);
  } catch (error) {
    console.error("[P1] state_id更新エラー:", error);
  }
};

// 保存処理
const handleSubmit = async () => {
  console.log("[P1] 送信するcase_id:", props.caseId);
  const formData = new FormData();
  formData.append("case_id", props.caseId);

  // 写真をフォームに追加
  photos.value.forEach(({ pictureType, file }) => {
    formData.append(`photos[${pictureType}]`, file);
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
    await updateStateToSubmitted(); // ✅ state_idを2に更新
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

    <button class="btn1" @click="handleSubmit">報告する</button>
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

.photo-uploader-group {
  margin-bottom: 20px;
}

textarea {
  width: 99%;
  padding: 10px;
  font-size: 14px;
  border: 2px solid #f7a400;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  margin-bottom: 20px;
}

.section-btn {
  text-align: right;
}

.btn1 {
  display: block;
  margin-left: auto;
  padding: 20px 70px;
  margin-top: 10px;
  color: #333;
  font-size: 30px;
  font-weight: 500;
  transition: transform 0.3s, box-shadow 0.3s;
}
</style>
