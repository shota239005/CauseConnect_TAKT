<script>
export default {
  props: {
    uploaders: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      previews: {},
    };
  },
  methods: {
    triggerFileInput(pictureType) {
      const fileInput = this.$refs.fileInputs.find(input => input.dataset.pictureType == pictureType);
      if (fileInput && typeof fileInput.click === "function") {
        fileInput.click();
      } else {
        console.error(`Invalid file input for pictureType: ${pictureType}`);
      }
    },
    handleFileChange(event, pictureType) {
      const file = event.target.files[0];
      if (file) {
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(file.type)) {
          alert("JPEG, PNG, GIF形式の画像を選択してください。");
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          alert("画像サイズは2MB以下にしてください。");
          return;
        }
        this.previews[pictureType] = URL.createObjectURL(file);
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
          class="hidden-input"
        />
        <img
          v-if="previews[uploader.pictureType]"
          :src="previews[uploader.pictureType]"
          :alt="`${uploader.label}のプレビュー画像`"
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
  gap: 20px;
}

.uploader {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 34px;
}

.uploader-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.select-photo-btn {
  padding: 20px 60px;
  background-color: #ff8c00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 24px;
  margin-bottom: 40px;
}

.select-photo-btn:hover {
  background-color: #e57c00;
}

.preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.hidden-input {
  display: none;
}

/* スマホ向け（600px以下） */
@media screen and (max-width: 600px) {
  body {
    font-size: 14px;
    background-color: #fff;
  }

  #app {
    max-width: 100%; /* スマホでは幅いっぱいにする */
    padding: 10px; /* 画面の端に余白を追加 */
  }

  .faq-item {
    padding: 15px 20px; /* 左右の余白を狭くする */
  }

  .faq-title {
    font-size: 1.5rem; /* タイトルを少し小さめに */
  }

  .modal-content {
    width: 95%; /* 画面幅に合わせる */
    padding: 15px; /* 余白を少し減らす */

  }
}

</style>
