<script setup>
</script>

<template>
  <div class="movie">
      <!-- 動画を背景として再生 -->
      <video autoplay loop muted playsinline class="background-video">
        <source src="/src/assets/img/Bowling Ball.mp4" type="video/mp4" />
        <!-- 動画が再生できない場合のフォールバック -->
        お使いのブラウザは動画をサポートしていません。
      </video>
    </div>
</template>

<style scoped>
.movie{
  width: 1000px;
  height: 200px;
}

</style>
