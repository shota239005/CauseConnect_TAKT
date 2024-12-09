<template>
    <div>
      <form @submit.prevent="uploadImage">
        <input type="file" @change="onFileChange" />
        <button type="submit">アップロード</button>
      </form>
      <div v-if="imageUrl">
        <h3>アップロードされた画像:</h3>
        <img :src="imageUrl" alt="Uploaded Image" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedFile: null,
        imageUrl: null,
      };
    },
    methods: {
      onFileChange(event) {
        this.selectedFile = event.target.files[0];
      },
      async uploadImage() {
        if (!this.selectedFile) {
          alert('画像を選択してください。');
          return;
        }
        const formData = new FormData();
        formData.append('image', this.selectedFile);
  
        try {
          const response = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          this.imageUrl = response.data.url;
          alert('画像が正常にアップロードされました。');
        } catch (error) {
          console.error('画像のアップロードに失敗しました:', error);
          alert('画像のアップロードに失敗しました。');
        }
      },
    },
  };
  </script>
  