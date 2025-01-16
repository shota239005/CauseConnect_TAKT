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
      const response = await apiClient.get("/user/me");
      const user = response.data;
      console.log("取得したユーザー情報:", user);

      if (user.icon) {
        const baseURL = (apiClient.defaults.baseURL || "").replace(/\/api$/, "");
        const iconPath = user.icon.replace(/^\/storage\//, "");
        this.imageUrl = `${baseURL}/storage/${iconPath}`;
        console.log("アイコン画像のURLを設定:", this.imageUrl);
      } else {
        console.log("アイコン画像が設定されていません。デフォルト画像を使用します。");
      }
    } catch (error) {
      console.error("ユーザー情報の取得中にエラーが発生しました:", error);
      this.imageUrl = "/default-avatar.png";
    }
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        console.log("選択されたファイル:", file);

        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
          alert("JPEG, PNG, GIF形式の画像を選択してください。");
          console.error("無効なファイル形式が選択されました:", file.type);
          return;
        }

        if (file.size > 2 * 1024 * 1024) {
          alert("ファイルサイズは2MB以下にしてください。");
          console.error("ファイルサイズが大きすぎます:", file.size);
          return;
        }

        if (this.imageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(this.imageUrl); // メモリリーク防止のため、既存のURLを解放
        }

        this.imageFile = file;
        this.imageUrl = URL.createObjectURL(file);  // ここで即時反映されるURLを設定
        console.log("プレビュー用の画像URLを設定:", this.imageUrl);

        // 画像選択時に自動でアップロード
        this.uploadImage();
      }
    },
    async uploadImage() {
      if (!this.imageFile) {
        console.warn("アップロードしようとしましたが、画像が選択されていません。");
        return;
      }

      const formData = new FormData();
      formData.append("icon", this.imageFile);

      this.isUploading = true;
      console.log("画像アップロードを開始...");

      try {
        const response = await apiClient.post("/user/icon", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const baseURL = (apiClient.defaults.baseURL || "").replace(/\/api$/, "");
        // タイムスタンプを追加してキャッシュを防止
        const newImageUrl = `${baseURL}${response.data.icon}?t=${new Date().getTime()}`;
        console.log("アップロード後の画像URL:", newImageUrl);

        // 自動的にリアクティブなimageUrlを更新
        this.imageUrl = newImageUrl;  // ここで自動的に反映される

        console.log("画像がアップロードされました:", response.data);
        alert("画像が正常にアップロードされました！");
        window.location.href = '/mypage'; // マイページにリダイレクト

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
      <label for="file-input" aria-label="プロフィール画像を変更">
        <img :src="imageUrl" alt="Profile Icon" @error="handleImageError" />
        <!-- グレーオーバーレイと変更テキスト -->
        <div class="overlay">
          <span class="change-text" v-if="!isUploading">変更する</span>
          <span class="change-text" v-else>アップロード中...</span>
        </div>
      </label>
      <!-- 画像ファイル選択 -->
      <input id="file-input" type="file" accept="image/*" @change="handleFileChange" style="display: none" />
    </div>
  </div>
</template>

<style scoped>
.pIcon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  margin-top: 10px;
  margin-bottom: 30px;
}

.profile-icon {
  width: 300px;
  height: 300px;
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

.profile-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-icon .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* グレーのオーバーレイ */
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0; /* 初期状態では非表示 */
  transition: opacity 0.3s ease;
}

.profile-icon .change-text {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.profile-icon:hover .overlay {
  opacity: 1; /* ホバー時にオーバーレイを表示 */
}

.btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #ff8c00;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.btn:disabled {
  background-color: #ff8c00;
  cursor: not-allowed;
}

.btn:hover:not(:disabled) {
  background-color: #e07a00;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid #fff;
  border-top: 3px solid #ff8c00;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
