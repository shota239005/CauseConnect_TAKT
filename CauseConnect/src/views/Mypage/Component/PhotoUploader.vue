<script>
import apiClient from "@/axios"; // axios 設定をインポート

export default {
  data() {
    return {
      imageUrl: "/default-avatar.png", // 初期状態ではデフォルト画像
      imageFile: null, // アップロードする画像ファイル
      isUploading: false, // アップロード中フラグ
    };
  },
  async created() {
    try {
      console.log("ユーザー情報を取得中...");

      // axios を使ってリクエストを送信
      const response = await apiClient.get("/user/me");
      const user = response.data;

      console.log("取得したユーザー情報:", user);

      // アイコン画像のURLを設定
      if (user.icon) {
        // Laravel からの icon パスに基づいて正しいURLを生成
        const baseURL = (apiClient.defaults.baseURL || "").replace(/\/api$/, "");
        // `/storage/` が含まれている場合は削除し、常に `/storage/` を付加
        const iconPath = user.icon.replace(/^\/storage\//, "");
        this.imageUrl = `${baseURL}/storage/${iconPath}`;
        console.log("アイコン画像のURLを設定:", this.imageUrl);

      } else {
        console.log("アイコン画像が設定されていません。デフォルト画像を使用します。");
      }
    } catch (error) {
      console.error("ユーザー情報の取得中にエラーが発生しました:", error);
      this.imageUrl = "/default-avatar.png"; // エラー時はデフォルト画像を使用
    }
  },
  methods: {
    // 画像ファイル選択時の処理
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        console.log("選択されたファイル:", file);

        // ファイル形式のチェック
        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
          alert("JPEG, PNG, GIF形式の画像を選択してください。");
          console.error("無効なファイル形式が選択されました:", file.type);
          return;
        }

        // ファイルサイズのチェック（例: 2MBまで）
        if (file.size > 2 * 1024 * 1024) {
          alert("ファイルサイズは2MB以下にしてください。");
          console.error("ファイルサイズが大きすぎます:", file.size);
          return;
        }

        // プレビュー用の画像URLを生成
        this.imageFile = file;
        this.imageUrl = URL.createObjectURL(file);
        console.log("プレビュー用の画像URLを設定:", this.imageUrl);
      }
    },

    // サーバーに画像をアップロード
    async uploadImage() {
      if (!this.imageFile) {
        alert("画像を選択してください。");
        console.warn("アップロードしようとしましたが、画像が選択されていません。");
        return;
      }

      const formData = new FormData();
      formData.append("icon", this.imageFile);

      this.isUploading = true;
      console.log("画像アップロードを開始...");

      try {
        // axios を利用してリクエスト送信
        const response = await apiClient.post("/user/icon", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // サーバーから新しい画像URLを取得して更新
        const baseURL = (apiClient.defaults.baseURL || "").replace(/\/api$/, "");
        this.imageUrl = `${baseURL}${response.data.icon}`;
        console.log("画像がアップロードされました:", response.data);
        alert("画像が正常にアップロードされました！");
        // ページをリロードして最新データを取得
        location.reload();
      } catch (error) {
        console.error("アップロード中にエラーが発生しました:", error);

        if (error.response) {
          console.error("サーバーレスポンス:", error.response.data);
          alert(`アップロードに失敗しました: ${error.response.status}`);
        } else {
          alert("サーバーエラーが発生しました。");
        }
      } finally {
        this.isUploading = false;
        console.log("アップロード処理が完了しました。");
      }
    },

    // プレビュー画像のエラーハンドリング
    handleImageError() {
      console.error("画像の読み込みに失敗しました。デフォルト画像を使用します。");
      this.imageUrl = "/default-avatar.png";
    },
  },
};
</script>

<template>
  <div class="pIcon">
    <!-- プロフィールアイコン表示部分 -->
    <div class="profile-icon">
      <label for="file-input">
        <img :src="imageUrl" alt="Profile Icon" @error="handleImageError" />
        <span class="plus-text">＋</span>
      </label>
      <!-- 画像ファイル選択 -->
      <input id="file-input" type="file" accept="image/*" @change="handleFileChange" style="display: none" />
    </div>

    <!-- アップロードボタン -->
    <button @click="uploadImage" class="upload-btn" :disabled="isUploading">
      {{ isUploading ? "アップロード中..." : "アップロード" }}
    </button>
  </div>
</template>

<style scoped>
.pIcon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  margin-top: 80px;
  margin-bottom: 80px;
}

.profile-icon {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  border: 2px solid #ff8c00;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;
}

.profile-icon:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.profile-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plus-text {
  position: absolute;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-icon:hover .plus-text {
  opacity: 1;
}

.upload-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff8c00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.upload-btn:hover {
  background-color: #e57c00;
}
</style>
