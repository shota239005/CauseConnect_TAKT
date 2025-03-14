<script>
import apiClient from '@/axios.js'; // apiClientモジュールをインポート

export default {
  data() {
    return {
      caseId: '', // アップロード用のCase ID
      pictureType: '', // アップロード用のPicture Type
      selectedFile: null, // アップロードする画像ファイル
      uploadedImageUrl: null, // アップロード後にプレビュー表示するURL
      fetchCaseId: '', // 取得用のCase ID
      fetchPictureType: '', // 取得用のPicture Type
      fetchedImageUrl: null, // サーバーから取得した画像を表示するURL
    };
  },
  methods: {
    // ファイル選択時の処理
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
      console.log('選択されたファイル:', this.selectedFile); // ファイル確認ログ
    },

    // 画像アップロード処理
    async uploadImage() {
      if (!this.selectedFile || !this.caseId || !this.pictureType) {
        alert('すべてのフィールドを入力してください。');
        return;
      }

      const formData = new FormData();
      formData.append('case_id', this.caseId);
      formData.append('picture_type', this.pictureType);
      formData.append('picture', this.selectedFile);

      // フォームデータのログを表示
      console.log('アップロードするデータ:');
      console.log('Case ID:', this.caseId);
      console.log('Picture Type:', this.pictureType);
      console.log('選択されたファイル:', this.selectedFile);

      try {
        const response = await apiClient.post('/images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('アップロード成功:', response); // 成功時のレスポンスログ
        this.uploadedImageUrl = response.data.url; // サーバーが返した画像URL
        alert('画像が正常にアップロードされました。');
      } catch (error) {
        console.error('画像のアップロードに失敗しました:', error);
        if (error.response) {
          console.error('レスポンスデータ:', error.response.data);
          console.error('ステータスコード:', error.response.status);
          console.error('ヘッダー:', error.response.headers);
        } else if (error.request) {
          console.error('リクエストエラー:', error.request);
        } else {
          console.error('エラー詳細:', error.message);
        }
        alert('画像のアップロードに失敗しました。');
      }
    },

    // サーバーから画像を取得する処理
    async fetchImage() {
      if (!this.fetchCaseId || !this.fetchPictureType) {
        alert('Case IDとPicture Typeを入力してください。');
        return;
      }

      // リクエスト前のデータログ
      console.log('取得リクエストデータ:');
      console.log('Fetch Case ID:', this.fetchCaseId);
      console.log('Fetch Picture Type:', this.fetchPictureType);

      try {
        const response = await apiClient.get(`/images/${this.fetchCaseId}/${this.fetchPictureType}`, {
          responseType: 'blob',
        });
        console.log('取得成功:', response); // 成功時のレスポンスログ
        const url = URL.createObjectURL(response.data);
        console.log('生成されたBlob URL:', url); // Blob URLを確認
        this.fetchedImageUrl = url;
        alert('画像を正常に取得しました。');
      } catch (error) {
        console.error('画像の取得に失敗しました:', error);
        if (error.response) {
          console.error('レスポンスデータ:', error.response.data);
          console.error('ステータスコード:', error.response.status);
          console.error('ヘッダー:', error.response.headers);
        } else if (error.request) {
          console.error('リクエストエラー:', error.request);
        } else {
          console.error('エラー詳細:', error.message);
        }
        alert('画像の取得に失敗しました。');
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>画像アップロードと表示</h1>

    <!-- アップロードフォーム -->
    <form @submit.prevent="uploadImage">
      <label>
        Case ID:
        <input type="number" v-model="caseId" placeholder="Case ID" required />
      </label>
      <label>
        Picture Type:
        <input type="number" v-model="pictureType" placeholder="Picture Type" required />
      </label>
      <label>
        画像を選択:
        <input type="file" @change="onFileChange" accept="image/*" />
      </label>
      <button type="submit">アップロード</button>
    </form>

    <!-- アップロードされた画像のプレビュー -->
    <div v-if="uploadedImageUrl">
      <h3>アップロードされた画像:</h3>
      <img :src="uploadedImageUrl" alt="Uploaded Image" />
    </div>

    <!-- 画像取得フォーム -->
    <form @submit.prevent="fetchImage">
      <label>
        Case ID (表示用):
        <input type="number" v-model="fetchCaseId" placeholder="Case ID" required />
      </label>
      <label>
        Picture Type (表示用):
        <input type="number" v-model="fetchPictureType" placeholder="Picture Type" required />
      </label>
      <button type="submit">画像を取得</button>
    </form>

    <!-- 保存された画像のプレビュー -->
    <div v-if="fetchedImageUrl">
      <h3>保存された画像:</h3>
      <img :src="fetchedImageUrl" alt="Fetched Image" />
    </div>
  </div>
</template>

<style scoped>
form {
  margin-bottom: 20px;
}
button {
  margin-top: 10px;
}
img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ccc;
  margin-top: 10px;
}
</style>
