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
    // ✅ 依頼者のデータを取得
    const requesterResponse = await apiClient.get(`/cases/${props.caseId}/requester`);
    requester.value = requesterResponse.data;

    // ✅ 出資者リストを取得
    const contributorsResponse = await apiClient.get(`/cases/${props.caseId}/contributors`);
    contributors.value = contributorsResponse.data.filter(
      (contributor) => contributor.user_id !== requester.value.user_id // 依頼者を除外
    );

    // ✅ 依頼者の出資ポイントを取得
    const requesterContributor = contributorsResponse.data.find(
      (contributor) => contributor.user_id === requester.value.user_id
    );
    requesterSupPoint.value = requesterContributor ? requesterContributor.sup_point : null;

    // ✅ 実行者リストを取得
    const executorsResponse = await apiClient.get(`/cases/${props.caseId}/executors`);
    executors.value = executorsResponse.data.filter(
      (executor) => executor.user_id !== requester.value.user_id // 依頼者を除外
    );
  } catch (error) {
    console.error('[ParticipantsInfo] データ取得に失敗:', error);
  }
};

// ✅ マウント時にデータを取得
onMounted(() => {
  fetchParticipants();
});
</script>

<template>
  <div class="participants-info">
    <h3>参加メンバー情報</h3>

    <!-- ✅ 依頼者情報 -->
    <section v-if="requester">
      <h4>依頼者</h4>
      <p>ID: {{ requester.user_id }} / ニックネーム: {{ requester.nickname }}
        <span v-if="requesterSupPoint"> / 依頼ポイント: {{ requesterSupPoint }}</span>
      </p>
    </section>

    <!-- ✅ 出資者情報 -->
    <section>
      <h4>出資者</h4>
      <ul v-if="contributors.length > 0">
        <li v-for="contributor in contributors" :key="contributor.user_id">
          ID: {{ contributor.user_id }} / ニックネーム: {{ contributor.nickname }} / 出資ポイント: {{ contributor.sup_point }}
        </li>
      </ul>
      <p v-else>なし</p>
    </section>

    <!-- ✅ 実行者情報 -->
    <section>
      <h4>実行者</h4>
      <ul v-if="executors.length > 0">
        <li v-for="executor in executors" :key="executor.user_id">
          ID: {{ executor.user_id }} / ニックネーム: {{ executor.nickname }} / 役割: {{ executor.leader === 1 ? 'リーダー' : 'メンバー' }}
        </li>
      </ul>
      <p v-else>なし</p>
    </section>
  </div>
</template>

<style scoped>
.participants-info {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.participants-info h3 {
  margin-bottom: 10px;
  font-size: 18px;
}

.participants-info section {
  margin-bottom: 15px;
}

.participants-info ul {
  list-style: none;
  padding: 0;
}

.participants-info li {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}
</style>
