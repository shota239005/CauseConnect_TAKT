<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/axios';

// ✅ 親から受け取るprops
const props = defineProps({
  caseId: {
    type: Number,
    required: true,
  },
});

// ✅ 各状態の管理
const requester = ref(null);
const requesterSupPoint = ref(null); // 依頼ポイント
const contributors = ref([]);
const executors = ref([]);

// ✅ データ取得関数
const fetchParticipants = async () => {
  try {
    const requesterResponse = await apiClient.get(`/cases/${props.caseId}/requester`);
    requester.value = requesterResponse.data;

    const contributorsResponse = await apiClient.get(`/cases/${props.caseId}/contributors`);
    contributors.value = contributorsResponse.data.filter(
      (contributor) => contributor.user_id !== requester.value.user_id
    );

    const requesterContributor = contributorsResponse.data.find(
      (contributor) => contributor.user_id === requester.value.user_id
    );
    requesterSupPoint.value = requesterContributor ? requesterContributor.sup_point : null;

    const executorsResponse = await apiClient.get(`/cases/${props.caseId}/executors`);
    executors.value = executorsResponse.data; // 依頼者を除外しない
    //依頼者を除外
    // executors.value = executorsResponse.data.filter(
    //   (executor) => executor.user_id !== requester.value.user_id 

    // );
  } catch (error) {
    console.error('[ParticipantsInfo] データ取得に失敗:', error);
  }
};

onMounted(() => {
  fetchParticipants();
});
</script>

<template>
  <div class="participants-info">
    <h3 class="title">参加メンバー情報</h3>

    <!-- ✅ 依頼者情報 -->
    <section v-if="requester" class="section requester-section">
      <h4 class="section-title">依頼者</h4>
      <p class="info">
        <span class="nickname">{{ requester.nickname }}</span>
        <span v-if="requesterSupPoint" class="details"> / 依頼ポイント: {{ requesterSupPoint }}</span>
      </p>
    </section>

    <!-- ✅ 出資者情報 -->
    <section class="section contributors-section">
      <h4 class="section-title">出資者</h4>
      <ul v-if="contributors.length > 0" class="list">
        <li v-for="contributor in contributors" :key="contributor.user_id" class="list-item">
          <span class="nickname">{{ contributor.nickname }}</span>
          <span class="details"> / 出資ポイント: {{ contributor.sup_point }}</span>
        </li>
      </ul>
      <p v-else class="empty">なし</p>
    </section>

    <!-- ✅ 実行者情報 -->
    <!-- <section class="section executors-section">
      <h4 class="section-title">実行者</h4>
      <ul v-if="executors.length > 0" class="list">
        <li v-for="executor in executors" :key="executor.user_id" class="list-item">
          <span class="nickname">{{ executor.nickname }}</span>
          <span class="details"> / 役割: {{ executor.leader === 1 ? 'リーダー' : 'メンバー' }}</span>
        </li>
      </ul>
      <p v-else class="empty">なし</p>
    </section> -->
    <section class="section executors-section">
      <h4 class="section-title">実行者</h4>
      <ul v-if="executors.length > 0" class="list">
        <li v-for="executor in executors" :key="executor.user_id" class="list-item">
          <span class="nickname">{{ executor.nickname }}</span>
          <span v-if="executor.user_id === requester.user_id" class="details">（依頼者）</span>
        </li>
      </ul>
      <p v-else class="empty">なし</p>
    </section>

  </div>
</template>

<style scoped>
.participants-info {
  font-family: 'Zen Maru Gothic', sans-serif;
  padding: 20px;
  border: 2px solid #f7a400;
  border-radius: 10px;
  background-color: #fff3cd;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.section {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #ff8c00;
  margin-bottom: 10px;
}

.info,
.list-item {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.nickname {
  font-weight: bold;
  color: #007bff;
}

.details {
  font-size: 14px;
  color: #555;
}

.list {
  list-style: none;
  padding: 0;
}

.list-item {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

.list-item:last-child {
  border-bottom: none;
}

.empty {
  font-size: 14px;
  color: #777;
  text-align: center;
}
</style>
