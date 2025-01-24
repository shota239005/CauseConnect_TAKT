<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/axios"; // axiosのインスタンスをインポート

// ✅ 親から受け取るprops（caseIdを動的に受け取る）
const props = defineProps({
  caseId: {
    type: [Number, String],
    required: true,
  },
});

const reportData = ref(null);
const photos = ref([]);
const imageUrls = ref([]);
const error = ref(null);
const successMessage = ref(null);

// ✅ 画像取得関数（API経由で取得）
const fetchImages = async () => {
  try {
    const baseURL = (apiClient.defaults.baseURL || "").replace(/\/api$/, "");
    const imageResponses = await Promise.all(
      photos.value.map((photo) =>
        apiClient.get(`/images/${props.caseId}/${photo.picture_type}`)
      )
    );
    imageUrls.value = imageResponses.map((response) =>
      response.data && response.data.picture
        ? `${baseURL}${response.data.picture}`
        : "/default-avatar.png"
    );
    console.log("[DEBUG] 画像取得成功:", imageUrls.value);
  } catch (err) {
    console.error("[ERROR] 画像の取得に失敗しました:", err);
  }
};

// ✅ データ取得関数（axiosを利用）
const fetchReportData = async () => {
  if (!props.caseId) {
    console.error("[ProgressStep3] caseIdが未定義です");
    error.value = "依頼IDが不正です。";
    return;
  }
  try {
    console.log("[ProgressStep3] 受け取ったcase_id:", props.caseId);
    const response = await apiClient.get(`/request-report/${props.caseId}`);
    reportData.value = response.data.report;
    photos.value = response.data.photos;
    await fetchImages(); // ✅ 画像を取得
  } catch (err) {
    error.value = "データの取得に失敗しました";
    console.error(err);
  }
};

// ✅ 承認ボタンでstate_idを3に更新する関数
const approveRequest = async () => {
  try {
    console.log(`[ProgressStep3] 承認リクエスト送信 (case_id: ${props.caseId})`);

    const response = await apiClient.put(`/case/${props.caseId}/update-state`, {
      state_id: 3,
    });

    console.log("承認成功:", response.data);
    successMessage.value = "承認が完了しました！";

    // ✅ 承認後にデータを再取得してUIを最新化
    await fetchReportData();
  } catch (err) {
    console.error("承認エラー:", err);
    error.value = "承認に失敗しました。再度お試しください。";
  }
};

// ✅ コンポーネントのマウント時にデータ取得
onMounted(() => {
  fetchReportData();
});
</script>

<template>
  <div class="progress-step3">
    <div v-if="reportData && photos.length">
      <div class="data-section">
        <h3>依頼報告と写真</h3>
        <div
          v-for="(photo, index) in photos"
          :key="photo.picture_type"
          class="report-item"
        >
          <!-- ✅ picture_type 3～6のみ表示 -->
          <template v-if="photo.picture_type >= 3 && photo.picture_type <= 6">
            <!-- ✅ 画像 -->
            <div class="fixed-size" v-if="imageUrls[index]">
              <img :src="imageUrls[index]" :alt="`写真タイプ${photo.picture_type}`" />
            </div>
            <p v-if="photo.picture_type === 3"><strong>実行者集合コメント:</strong> {{ reportData.comment1 }}</p>
            <p v-if="photo.picture_type === 4"><strong>依頼場所コメント:</strong> {{ reportData.comment2 }}</p>
            <p v-if="photo.picture_type === 5"><strong>実行前コメント:</strong> {{ reportData.comment3 }}</p>
            <p v-if="photo.picture_type === 6"><strong>実行後コメント:</strong> {{ reportData.comment4 }}</p>
          </template>
        </div>
      </div>
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <div class="approval-buttons container-right">
      <h2>※承認を押すと進捗状況が更新されます</h2>
      <button class="btn1" @click="approveRequest">承認</button>
      <button class="btnNo">非承認</button>
    </div>
  </div>
</template>

<style scoped>

p{
font-size: 24px;
margin-bottom: 70px;
}

strong{
  font-size: 34px;
}
.success-message {
  color: #28a745;
  font-size: 16px;
  margin-top: 20px;
}

.error-message {
  color: #d9534f;
  font-size: 16px;
  margin-top: 20px;
}

.loading {
  color: #999;
  font-size: 16px;
  margin-top: 20px;
}

.approval-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 20px;
  align-items: flex-end;
}

.btn1 {
  padding: 20px 60px;
  color: #fff;
  background-color: #28a745;
  font-size: 30px;
  font-weight: 500;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 5px 5px 0 #218838;

}


.btn1:hover {
  background-color: #218838;
  color: #fff;
}

.btnNo {
  padding: 20px 40px;
  color: #fff;
  background-color: #dc3545;
  font-size: 30px;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 5px 5px 0 #c82333;

}

.btnNo:hover {
  background-color: #c82333;
  color: #fff;

}

.fixed-size {
  width: 100%; /* スマホでは幅いっぱいに */
  max-width: 500px; /* PCでは最大500px */
  height: auto; /* 高さを自動調整 */  overflow: hidden; /* はみ出した部分を非表示 */
  border-radius: 8px; /* 角を丸くする */
  display: flex;
  justify-content: center;
  align-items: center;
}

.fixed-size img {
  width: 100%;
  height: auto;
  object-fit: contain; /* 画像が枠内に収まるように */
}

/* スマホ向け（600px以下） */
@media screen and (max-width: 600px) {
  body {
    font-size: 14px;
    background-color: #fff;
  }

  #app {
    max-width: 100%; /* スマホでは幅いっぱいにする */
    padding: 10px; /* 画面の端に余白を追加 */
  }

  .faq-item {
    padding: 15px 20px; /* 左右の余白を狭くする */
  }

  .faq-title {
    font-size: 1.5rem; /* タイトルを少し小さめに */
  }

  .modal-content {
    width: 95%; /* 画面幅に合わせる */
    padding: 15px; /* 余白を少し減らす */

  }
}

</style>
