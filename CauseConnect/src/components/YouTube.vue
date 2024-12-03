
<script>
export default {
  props: {
    videoId: {
      type: String,
      required: true
    }
  },
  computed: {
    videoUrl() {
      // 自動再生のクエリパラメータを追加
      return `https://www.youtube.com/embed/${this.videoId}?autoplay=1&mute=1&enablejsapi=1`;
    }
  }
};
</script>
<template>
  <div class="youtube-player">
    <iframe
      :src="videoUrl"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.youtube-player iframe {
  width: 85px;
  height: 56px;
}
</style>
