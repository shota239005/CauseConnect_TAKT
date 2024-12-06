<script setup>
import BasicInfo from './components/BasicInfo.vue';
import Editmenu from './components/Editmenu.vue';
import ProgressStep from './components/ProgressStep/ProgressStep.vue';
import search from '@/components/search.vue';

// 進行度の状態（0～4）
const currentProgress = 2; // 仮の進行度データ（0:未着手、4:完了）
</script>

<template>
  <search/>
    <div class="detail-page">
        <!-- 上部：基本情報＆参加者情報 -->
        <div class="upper-section">
            <div class="left-section">
                <BasicInfo />
            </div>
            <div class="right-section">
                <Editmenu />
            </div>
        </div>

        <!-- 下部：進行度1～4 -->
        <div class="progress-section">
            <ProgressStep />
        </div>
    </div>
</template>

<style scoped>
.detail-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.upper-section {
    display: flex;
    gap: 20px;
}

.left-section,
.right-section {
    flex: 1;
}

.progress-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.search-container{
  height: 10px;
  margin-right: -40px;
  margin-top: 0px;

}
</style>
