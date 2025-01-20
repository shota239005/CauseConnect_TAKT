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

// ✅ 各参加者の状態管理
const requester = ref(null);
const contributors = ref([]);
const executors = ref([]);
const requesterSupPoint = ref(null); // ✅ 依頼者の出資ポイント

// ✅ 依頼者の取得
const fetchRequester = async () => {
  try {
    const response = await apiClient.get(`/cases/${props.caseId}/requester`);
    requester.value = response.data;
    console.log('[Par] 依頼者取得:', requester.value);
  } catch (error) {
    console.error('[ParticipantsInfo] 依頼者の取得に失敗:', error);
  }
};

// ✅ 出資者の取得
const fetchContributors = async () => {
  try {
    const response = await apiClient.get(`/cases/${props.caseId}/contributors`);
    contributors.value = response.data;
    console.log('[Par] 出資者取得:', contributors.value);

    // ✅ 依頼者の出資ポイントを取得
    const requesterContributor = contributors.value.find(contributor => contributor.user_id === requester.value?.user_id);
    requesterSupPoint.value = requesterContributor ? requesterContributor.sup_point : null;

  } catch (error) {
    console.error('[Par] 出資者の取得に失敗:', error);
  }
};

// ✅ 実行者の取得
const fetchExecutors = async () => {
  try {
    const response = await apiClient.get(`/cases/${props.caseId}/executors`);
    executors.value = response.data;
    console.log('[Par] 実行者取得:', executors.value);
  } catch (error) {
    console.error('[Par] 実行者の取得に失敗:', error);
  }
};

// ✅ コンポーネントがマウントされたときに全データ取得
onMounted(() => {
  console.log(`[Par] 受け取ったcaseId: ${props.caseId}`);
  fetchRequester().then(fetchContributors);
  fetchExecutors();
});
</script>

<template>
  <div class="participants-info">
    <h3>参加メンバー情報</h3>

    <!-- ✅ 依頼者の表示 -->
    <section v-if="requester">
      <h4>依頼者</h4>
      <p>ID: {{ requester.user_id }} / ニックネーム: {{ requester.nickname }}
      <span v-if="requesterSupPoint"> / 依頼ポイント: {{ requesterSupPoint }}</span></p>
    </section>

    <!-- ✅ 出資者の表示 -->
    <section>
      <h4>出資者</h4>
      <ul>
        <li v-for="contributor in contributors" :key="contributor.user_id">
          ID: {{ contributor.user_id }} / ニックネーム: {{ contributor.nickname }} / 出資ポイント: {{ contributor.sup_point }}
        </li>
      </ul>
    </section>

    <!-- ✅ 実行者の表示 -->
    <section>
      <h4>実行者</h4>
      <ul>
        <li v-for="executor in executors" :key="executor.user_id">
          ID: {{ executor.user_id }} / ニックネーム: {{ executor.nickname }} / 役割: {{ executor.leader === 1 ? 'リーダー' : 'メンバー' }}
        </li>
      </ul>
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
