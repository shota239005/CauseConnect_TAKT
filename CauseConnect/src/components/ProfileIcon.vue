<template>
  <div>
    <div class="profile-icon">
      <img :src="imageUrl" alt="Profile Icon" />
    </div>
    <button @click="changeImage">画像を変更</button>
  </div>
</template>

<script>
export default {
  props: {
    initialImageUrl: { // 親コンポーネントから画像URLを受け取る
      type: String,
      required: true,
    },
  },
  data() {
    return {
      imageUrl: this.initialImageUrl, // 初期値をpropsから取得
    };
  },
  methods: {
    changeImage() {
      this.imageUrl = "./assets/img/sample2.jpg"; // 別の画像に変更
    },
  },
};
</script>

<style scoped>
.profile-icon {
  width: 100px; /* アイコンの幅 */
  height: 100px; /* アイコンの高さ */
  border-radius: 50%; /* 円形にする */
  overflow: hidden; /* 円形外の画像を隠す */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ccc; /* 枠線を追加 */
}

.profile-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 画像をアイコン内にフィットさせる */
}
</style>
