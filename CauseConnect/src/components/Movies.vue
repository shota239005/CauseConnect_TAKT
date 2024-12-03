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
.background-video {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 動画を親要素にフィットさせる */
}
.movie {
  position: relative;
  width: 500px;
  height: 200px;
  overflow: hidden; /* 必要に応じて動画のはみ出し部分を隠す */
}

</style>
