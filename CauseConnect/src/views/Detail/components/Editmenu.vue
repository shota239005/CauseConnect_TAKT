<script>
import { ref } from 'vue';
import ParticipantsInfo from "./EditMenu/ParticipantsInfo.vue";
import RequesterMenu from "./EditMenu/RequesterMenu.vue";
import ContributorMenu from "./EditMenu/ContributorMenu.vue";
import ExecutorMenu from "./EditMenu/ExecutorMenu.vue";


export default {
  name: "EditMenu",
  components: {
    ParticipantsInfo,
    RequesterMenu,
    ContributorMenu,
    ExecutorMenu,
  },
  data() {
    return {
      isParticipantsInfoVisible: true,
      isRequesterMenuVisible: true,
      isContributorMenuVisible: true,
      isExecutorMenuVisible: true,
      totalPoints: 0, // 総額を保持するデータ
      executorsCount: 0, // 実行者人数を保持するデータ
    };
  },
  computed: {
    rewardPerPerson() {
      // 実行者人数が0でない場合、報酬/人を計算
      return this.executorsCount > 0 ? (this.totalPoints / this.executorsCount).toFixed(0) : 0;
    },
  },
  methods: {
    toggleSection(section) {
      this[section] = !this[section];
    },
    updateTotalPoints(newTotalPoints) {
      this.totalPoints = newTotalPoints; // 親コンポーネントでポイント更新
    },
    updateExecutors(newExecutorsCount) {
      this.executorsCount = newExecutorsCount; // 実行者人数を更新
    },
  },
};
</script>

<template>
  <div class="edit-menu">
    <!-- 現在積立ポイント -->
    <div class="points-section">
      <h3>現在積立ポイント</h3>
      <div class="points-container">
        <div class="point-item total">
          <p>総額</p>
          <p>{{ totalPoints }}P</p> <!-- 総額を表示 -->
        </div>
        <div class="point-item per-person" :style="{ backgroundColor: rewardColor }">
          <p>報酬/人</p>
          <p>{{ rewardPerPerson }}P</p> <!-- 切り捨てられた報酬/人 -->
        </div>
      </div>
    </div>

    <!-- 参加者一覧 -->
    <div class="section">
      <button class="toggle-button" @click="toggleSection('isParticipantsInfoVisible')">
        参加者一覧 {{ isParticipantsInfoVisible ? '▲' : '▼' }}
      </button>
      <ParticipantsInfo
        v-if="isParticipantsInfoVisible"
        @updatePoints="updateTotalPoints"
        @updateExecutors="updateExecutors" /> <!-- 参加者情報の更新を受け取る -->
    </div>

    <!-- メニュー -->
    <div class="menu-section">
      <div class="section">
        <button class="toggle-button" @click="toggleSection('isRequesterMenuVisible')">
          依頼者メニュー {{ isRequesterMenuVisible ? '▲' : '▼' }}
        </button>
        <RequesterMenu v-if="isRequesterMenuVisible" />
      </div>

      <div class="section">
        <button class="toggle-button" @click="toggleSection('isContributorMenuVisible')">
          出資者メニュー {{ isContributorMenuVisible ? '▲' : '▼' }}
        </button>
        <ContributorMenu v-if="isContributorMenuVisible" />
      </div>

      <div class="section">
        <button class="toggle-button" @click="toggleSection('isExecutorMenuVisible')">
          実行者メニュー {{ isExecutorMenuVisible ? '▲' : '▼' }}
        </button>
        <ExecutorMenu v-if="isExecutorMenuVisible" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.edit-menu {
  font-family: "Zen Maru Gothic", sans-serif;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border: 2px solid #f7a400;
  border-radius: 8px;
}

.points-section {
  margin-bottom: 20px;
}

.points-section h3 {
  font-size: 1.2em;
  color: #333;
  margin-bottom: 10px;
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

.menu-section {
  margin-top: 20px;
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
  color: #333;
  background-color: #f7a400
  ;
}

.toggle-button:hover {
  background-color: #ff8c00;
}

.section {
  margin-bottom: 20px;
}
</style>
