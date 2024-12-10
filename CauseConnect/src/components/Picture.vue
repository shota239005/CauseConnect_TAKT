<template>
  <div>
    <!-- アップロードフォーム -->
    <form @submit.prevent="uploadImage">
      <input type="file" @change="onFileChange" />
      <button type="submit">アップロード</button>
    </form>

    <!-- アップロードされた画像のプレビュー -->
    <div v-if="uploadedImageUrl">
      <h3>アップロードされた画像:</h3>
      <img :src="uploadedImageUrl" alt="Uploaded Image" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null, // 選択された画像ファイル
      uploadedImageUrl: null, // サーバーから返された画像のURL
    };
  },
  methods: {
    // ファイル選択時の処理
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },

    // 画像アップロード処理
    async uploadImage() {
      if (!this.selectedFile) {
        alert('画像を選択してください。');
        return;
      }

      const formData = new FormData();
      formData.append('image', this.selectedFile); // 画像をFormDataに追加

      try {
        // Laravelサーバーに画像をアップロード
        const response = await axios.post('http://127.0.0.1:8000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // サーバーから返された完全な画像URLを使用
        this.uploadedImageUrl = response.data.url;

        alert('画像が正常にアップロードされました。');
      } catch (error) {
        console.error('画像のアップロードに失敗しました:', error);
        alert('画像のアップロードに失敗しました。');
      }
    },
  },
};
</script>

