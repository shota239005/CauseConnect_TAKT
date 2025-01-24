<script setup>
import { ref, computed, onMounted } from 'vue';
import ParticipantsInfo from "./EditMenu/ParticipantsInfo.vue";
import RequesterMenu from "./EditMenu/RequesterMenu.vue";
import ContributorMenu from "./EditMenu/ContributorMenu.vue";
import ExecutorMenu from "./EditMenu/ExecutorMenu.vue";
import apiClient from '@/axios'; // axiosのインポート

// ✅ 親から受け取るprops
const props = defineProps({
  caseId: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  request: {
    type: [Object, Array],
    required: true,
  },
});

// ✅ requestオブジェクトが配列の場合に対応
const requestData = Array.isArray(props.request) ? props.request[0] : props.request;

// ✅ データの状態管理
const isParticipantsInfoVisible = ref(true);
const isRequesterMenuVisible = ref(true);
const isContributorMenuVisible = ref(true);
const isExecutorMenuVisible = ref(true);
const totalPoints = ref(0);
const executorsCount = ref(0);
const executorParticipantsCount = ref(0); // 実行者として参加している人数

// ✅ 計算プロパティ
const rewardPerPerson = computed(() => {
  return executorsCount.value > 0 ? (totalPoints.value / executorsCount.value).toFixed(0) : 0;
});

// ✅ セクション表示切替（型チェック強化）
const toggleSection = (section) => {
  if (typeof section === 'boolean') {
    console.error('toggleSectionエラー: booleanが渡されています。refを渡してください。');
    return;
  }
  if (section && typeof section.value === 'boolean') {
    section.value = !section.value;
  } else {
    console.error('toggleSectionエラー: 引数がrefではありません', section);
  }
};

// ✅ トータルポイント取得処理
const fetchTotalPoints = async () => {
  console.log(`送信するcase_id: ${requestData.case_id}`);
  try {
    const response = await apiClient.get(`/cases/${requestData.case_id}/total-points`);
    console.log("APIレスポンス:", response.data); // デバッグ用
    if (response.data.success) {
      totalPoints.value = response.data.total_points;
      console.log(`トータルポイント取得成功: ${totalPoints.value}`);
    } else {
      console.error(`トータルポイント取得失敗: ${response.data.message}`);
    }
  } catch (error) {
    console.error("トータルポイント取得エラー:", error);
  }
};

// ✅ 実行者人数の更新
const updateExecutors = (newExecutorsCount) => {
  executorsCount.value = newExecutorsCount;
};

// ✅ 実行者として参加している人数を取得
const fetchExecutorParticipants = async () => {
  try {
    const response = await apiClient.get(`/cases/${requestData.case_id}/executors`);
    executorParticipantsCount.value = response.data.length;
    console.log(`実行者として参加している人数: ${executorParticipantsCount.value}`);
  } catch (error) {
    console.error("実行者人数の取得エラー:", error);
  }
};

// ✅ 初期化処理
onMounted(() => {
  console.log(`[Edit]取得したcaseId: ${requestData.case_id}`);
  console.log(`[Edit]取得したuserId: ${props.userId}`);
  console.log(`[Edit]取得したrequestオブジェクト:`, props.request);

  // トータルポイント取得
  fetchTotalPoints();

  // 実行者として参加している人数を取得
  fetchExecutorParticipants();
});
</script>

<template>
  <div class="edit-menu">
    <div class="points-section">
      <h3>現在積立ポイント</h3>
      <div class="points-container">
        <div class="point-item total">
          <p>総額</p>
          <p>{{ totalPoints }}P</p>
        </div>
        <div class="point-item per-person">
          <p>報酬/人</p>
          <!-- 実行者が0人の場合は0Pを表示 -->
          <p>{{ executorParticipantsCount > 0 ? Math.floor(totalPoints / executorParticipantsCount) : 0 }}P</p>
        </div>
      </div>
    </div>

    <div class="section">
      <button class="toggle-button" @click="toggleSection(isParticipantsInfoVisible)">
        参加者一覧 {{ isParticipantsInfoVisible ? '▲' : '▼' }}
      </button>
      <ParticipantsInfo v-show="isParticipantsInfoVisible" :caseId="requestData.case_id" :userId="props.userId"
        @updatePoints="updateTotalPoints" @updateExecutors="updateExecutors" />
    </div>

    <div class="menu-section">
      <div class="section">
        <button class="toggle-button" @click="toggleSection(isRequesterMenuVisible)">
          依頼者メニュー {{ isRequesterMenuVisible ? '▲' : '▼' }}
        </button>
        <div v-show="isRequesterMenuVisible" class="menu-content">
          <RequesterMenu :caseId="requestData.case_id" :userId="props.userId" />
        </div>
      </div>

      <div class="section">
        <button class="toggle-button" @click="toggleSection(isContributorMenuVisible)">
          出資者メニュー {{ isContributorMenuVisible ? '▲' : '▼' }}
        </button>
        <div v-show="isContributorMenuVisible" class="menu-content">
          <ContributorMenu :caseId="requestData.case_id" :userId="props.userId" />
        </div>
      </div>

      <div class="section">
        <button class="toggle-button" @click="toggleSection(isExecutorMenuVisible)">
          実行者メニュー {{ isExecutorMenuVisible ? '▲' : '▼' }}
        </button>
        <div v-show="isExecutorMenuVisible" class="menu-content">
          <ExecutorMenu :caseId="requestData.case_id" :userId="props.userId" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edit-menu {
  font-family: "Zen Maru Gothic", sans-serif;
  padding: 20px;
  background-color: #fff;
  border: 2px solid #f7a400;
  border-radius: 8px;
}

.points-section {
  margin-bottom: 20px;
}

.points-container {
  display: flex;
  gap: 20px;
}

.point-item {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  color: #333;
  font-size: 30px;
}

.point-item.total {
  background-color: #ffcc00;
}

.point-item.per-person {
  background-color: #7ed957;
}

.point-item.executors {
  background-color: #87ceeb;
}

.toggle-button {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 10px;
  font-size: 1.2em;
  cursor: pointer;
  background-color: #f7a400;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.toggle-button:hover {
  background-color: #ff8c00;
}
</style>
