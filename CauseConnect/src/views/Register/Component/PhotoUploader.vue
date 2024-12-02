<script>
export default {
  props: {
    initialImageUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      imageUrl: this.initialImageUrl,
    };
  },
  methods: {
    changeImage() {
      this.imageUrl = "@/assets/img/sample2.jpg"; // public/img/sample2.jpg を参照
    }
  },
};
</script>

<template>
  <div class="pIcon">
    <div class="profile-icon" @click="changeImage">
      <img :src="imageUrl" alt="Not" />
      <span class="plus-text">＋</span>
    </div>
  </div>
</template>

<style scoped>
.pIcon {
  display: flex; /* フレックスボックスを使用 */
  justify-content: center; /* 水平方向に中央揃え */
  align-items: center; /* 垂直方向に中央揃え */
  height: 100px; /* 画面全体の高さを確保 */
  margin-top: 80px;
  margin-bottom: 80px;
}
.profile-icon {
  width: 200px; /* アイコンの幅 */
  height: 200px; /* アイコンの高さ */
  border-radius: 50%; /* 円形にする */
  overflow: hidden; /* 円形外の画像を隠す */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;;
  border: 2px solid #ff8c00; /* 枠線を追加 */
  cursor: pointer; /* クリック可能であることを示す */
  position: relative; /* テキストを重ねるために必要 */
  transition: background-color 0.3s ease; /* ホバー感の演出 */
}

.profile-icon:hover {
  background-color: rgba(0, 0, 0, 0.5); /* ホバー時に背景色を暗くする */
}

.profile-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 画像をアイコン内にフィットさせる */
}

.plus-text {
  position: absolute; /* アイコン中央に固定 */
  color: white; /* テキスト色 */
  font-size: 2rem; /* テキストサイズ */
  font-weight: bold; /* テキストを太字に */
  opacity: 0; /* デフォルトでは非表示 */
  transition: opacity 0.3s ease; /* ホバー時のフェードイン演出 */
}

.profile-icon:hover .plus-text {
  opacity: 1; /* ホバー時に表示 */
}
</style>
