<script setup>
// 仮の参加者データ
const participants = {
  requester: '山田 太郎',
  supporters: ['佐藤 花子', '鈴木 一郎', '田中 花子'],
  executors: ['高橋 次郎', '中村 美咲'],
};
</script>

<template>
  <div class="participants-info">
    <h2>参加者情報</h2>

    <!-- 依頼者 -->
    <p class="requester"><strong>依頼者：</strong>{{ participants.requester }}</p>

    <!-- 出資者 -->
    <div v-if="participants.supporters.length">
      <p v-for="(supporter, index) in participants.supporters" :key="'supporter-' + index" class="supporter">
        <strong>出資者：</strong>{{ supporter }}
      </p>
    </div>

    <!-- 実行者 -->
    <div v-if="participants.executors.length">
      <p v-for="(executor, index) in participants.executors" :key="'executor-' + index" class="executor">
        <strong>実行者：</strong>{{ executor }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.participants-info {
  padding: 15px;
  border: 1px solid #ccc;
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
  color: #007bff; /* 青色 */
}

/* 出資者のスタイル */
.supporter {
  color: #28a745; /* 緑色 */
}

/* 実行者のスタイル */
.executor {
  color: #dc3545; /* 赤色 */
}
</style>
