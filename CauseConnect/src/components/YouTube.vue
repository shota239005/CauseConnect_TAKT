<template>
  <div class="youtube-player">
    <iframe
      :src="videoUrl"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
  </div>
</template>

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
      return `https://www.youtube.com/embed/${this.videoId}?autoplay=1&mute=1`; // mute=1で音声なし
    }
  }
};
</script>

<style scoped>
.youtube-player iframe {
  width: 20%;
  height: 20%;
}
</style>
