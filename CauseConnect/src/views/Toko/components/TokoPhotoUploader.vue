<template>
    <div class="photo-uploader">
      <label :for="uploaderId">写真をアップロード</label>
      <input
        :id="uploaderId"
        type="file"
        @change="handleFileChange"
        accept="image/*"
      />
      <button @click="uploadImage" :disabled="isUploading">
        {{ isUploading ? "アップロード中..." : "アップロード" }}
      </button>
      <img v-if="imageUrl" :src="imageUrl" alt="プレビュー画像" />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      pictureType: {
        type: Number,
        required: true, // 投稿箇所ごとに異なる`pictureType`を指定
      },
      caseId: {
        type: Number,
        required: true, // caseIdを親から受け取る
      },
    },
    data() {
      return {
        imageFile: null, // アップロードする画像ファイル
        imageUrl: "", // プレビュー画像URL
        isUploading: false, // アップロード中フラグ
      };
    },
    computed: {
      uploaderId() {
        // 各コンポーネントでユニークなIDを生成
        return `photo-uploader-${this.pictureType}`;
      },
    },
    methods: {
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.imageFile = file;
          this.imageUrl = URL.createObjectURL(file); // プレビュー画像URLを設定
        }
      },
      async uploadImage() {
        if (!this.imageFile) {
          alert("画像を選択してください！");
          return;
        }
  
        const formData = new FormData();
        formData.append("photo", this.imageFile);
        formData.append("case_id", this.caseId);
        formData.append("picture_type", this.pictureType);
  
        this.isUploading = true;
  
        try {
          const response = await fetch("http://172.16.3.135:8000/api/content/upload", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          });
  
          if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status}`);
          }
  
          const data = await response.json();
          alert("画像がアップロードされました！");
          console.log("アップロード成功:", data);
        } catch (error) {
          console.error("アップロードエラー:", error);
          alert("アップロード中にエラーが発生しました。");
        } finally {
          this.isUploading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .photo-uploader {
    margin-bottom: 20px;
  }
  </style>
  