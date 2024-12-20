<script>
export default {
  props: {
    uploaders: {
      type: Array,
      required: true, // アップローダー情報をリストとして受け取る
    },
    caseId: {
      type: Number,
      required: false, // オプションとして投稿後の依頼IDを受け取る
    },
  },
  data() {
    return {
      previews: {}, // プレビュー画像のURLを保持
    };
  },
  methods: {
    /**
     * ファイル選択ダイアログを開く
     * @param {Number} pictureType - 現在のアップローダーの識別子
     */
    triggerFileInput(pictureType) {
      this.$nextTick(() => {
        // 静的な ref の中から特定の入力要素を取得
        const fileInput = Array.from(this.$refs.fileInputs).find(
          (input) => input.dataset.pictureType == pictureType
        );
        if (fileInput && typeof fileInput.click === "function") {
          fileInput.click();
        } else {
          console.error(`Invalid file input for pictureType: ${pictureType}`);
        }
      });
    },

    /**
     * ファイル選択後の処理
     * @param {Event} event - ファイル選択イベント
     * @param {Number} pictureType - 現在のアップローダーの識別子
     */
    handleFileChange(event, pictureType) {
      const file = event.target.files[0]; // 選択されたファイルを取得
      if (file) {
        // プレビュー画像のURLを生成して保持
        this.previews[pictureType] = URL.createObjectURL(file);
        // 親コンポーネントにファイルデータを通知
        this.$emit("photosUpdated", { pictureType, file });
      } else {
        console.warn(`No file selected for pictureType: ${pictureType}`);
      }
    },
  },
};
</script>

<template>
  <div class="photo-uploader-group">
    <div v-for="uploader in uploaders" :key="uploader.pictureType" class="uploader">
      <label>{{ uploader.label }}</label>
      <div class="uploader-controls">
        <button type="button" class="select-photo-btn" @click="triggerFileInput(uploader.pictureType)">
          写真を選択
        </button>
        <input
          type="file"
          ref="fileInputs" 
          :data-picture-type="uploader.pictureType" 
          @change="handleFileChange($event, uploader.pictureType)"
          accept="image/*"
          style="display: none;"
        />
        <img
          v-if="previews[uploader.pictureType]"
          :src="previews[uploader.pictureType]"
          alt="プレビュー画像"
          class="preview"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.photo-uploader-group {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 各アップローダー間のスペース */
}

.uploader {
  display: flex;
  flex-direction: column;
  gap: 10px; /* ラベルとコントロール間のスペース */
}

.uploader-controls {
  display: flex;
  align-items: center;
  gap: 10px; /* ボタンとプレビュー画像の間のスペース */
}

.select-photo-btn {
  padding: 10px 15px;
  background-color: #ff8c00; /* ボタンの背景色 */
  color: white;
  border: none;
  border-radius: 5px; /* ボタンの角を丸める */
  cursor: pointer;
  font-size: 1rem;
}

.select-photo-btn:hover {
  background-color: #e57c00; /* ホバー時の背景色 */
}

.preview {
  width: 100px; /* プレビュー画像の幅 */
  height: 100px; /* プレビュー画像の高さ */
  object-fit: cover; /* 画像を中央に収める */
  border: 1px solid #ccc; /* 枠線 */
  border-radius: 5px; /* 角を丸める */
}
</style>
