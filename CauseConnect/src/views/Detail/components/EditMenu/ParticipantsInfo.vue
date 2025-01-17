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

// ✅ 実行者のuser_idリストの状態管理
const participants = ref([]);

// ✅ 実行者ID（user_id）を取得する関数
const fetchParticipants = async () => {
  try {
    // ✅ エンドポイント: /cases/{case_id}/executors からuser_id一覧を取得
    const response = await apiClient.get(`/cases/${props.caseId}/executors`);
    participants.value = response.data;  // user_idの配列

    console.log('[ParticipantsInfo] 実行者ID取得:', participants.value);
  } catch (error) {
    console.error('[ParticipantsInfo] 実行者IDの取得に失敗:', error);
  }
};

// ✅ コンポーネントがマウントされたときに実行
onMounted(() => {
  console.log(`[ParticipantsInfo] 受け取ったcaseId: ${props.caseId}`);
  fetchParticipants();
});
</script>

<template>
  <div class="participants-info">
    <h3>実行者ID一覧</h3>
    <ul>
      <!-- ✅ user_idのリストを表示 -->
      <!-- <li v-for="id in participants" :key="id">
        実行者ID: {{ id }}
      </li> -->
    </ul>
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

.participants-info ul {
  list-style: none;
  padding: 0;
}

.participants-info li {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}
</style>
