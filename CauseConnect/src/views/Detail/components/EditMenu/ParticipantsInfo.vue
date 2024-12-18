<!--ゴールとして、それぞれの参加者をクリックすると、
その参加者のプロフィールを閲覧できたらいいね-->

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['updatePoints', 'updateExecutors']); // 親コンポーネントにデータを渡すイベント

const master = 'タロー'; // 依頼者名

const participants = {
  requester: { name: '★' + master, points: 400 }, // 依頼者にポイントを追加
  supporters: [
    { name: 'さっちゃん', points: 100 },
    { name: 'がまかつ', points: 300 },
  ],
  executors: ['★' + master, 'ガープ', 'ヒナ'], // 実行者リスト
};

// 依頼者と出資者のポイントの合計を計算
const totalPoints = participants.requester.points + participants.supporters.reduce((total, supporter) => total + supporter.points, 0);

// 実行者人数をカウント
const executorsCount = participants.executors.length;

// 親コンポーネントに総ポイントと実行者人数を送信
emit('updatePoints', totalPoints);
emit('updateExecutors', executorsCount);
</script>

<template>
  <div class="participants-info">
    <!-- 依頼者 -->
    <p class="requester">
      <strong>依頼者：</strong>{{ participants.requester.name }} ({{ participants.requester.points }}P)
    </p>

    <!-- 出資者 -->
    <div v-if="participants.supporters.length">
      <p
        v-for="(supporter, index) in participants.supporters"
        :key="'supporter-' + index"
        class="supporter"
      >
        <strong>出資者：</strong>{{ supporter.name }} ({{ supporter.points }}P)
      </p>
    </div>

    <!-- 実行者 -->
    <div v-if="participants.executors.length">
      <p
        v-for="(executor, index) in participants.executors"
        :key="'executor-' + index"
        class="executor"
      >
        <strong>実行者：</strong>{{ executor }}
      </p>
    </div>
  </div>
</template>


<style scoped>
.participants-info {
  border-radius: 8px;
  background-color: #fff;
  width: 100%;
  max-width: 600px; /* 最大幅を設定 */
  margin: 20px auto; /* 中央寄せ */
}

h2 {
  font-size: 24px;
  margin-bottom: 15px;
}

/* 共通スタイル */
p {
  font-size: 16px;
  margin: 5px 0;
}

strong {
  font-weight: bold;
}

/* 依頼者のスタイル */
.requester {
  color: #dc3545;
}

/* 出資者のスタイル */
.supporter {
  color: #007bff;
}

/* 実行者のスタイル */
.executor {
  color: #28a745;
}
</style>
