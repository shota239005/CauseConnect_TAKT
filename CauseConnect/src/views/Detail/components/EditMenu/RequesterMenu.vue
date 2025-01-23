<script>
import IraiContributorPopup from './IraiContributorPopup.vue';
import MG from '@/components/MG.vue'; // MGコンポーネントをインポート
import apiClient from '@/axios';

export default {
  name: "RequesterMenu",
  props: {
    caseId: {
      type: [Number, String],
      required: true,
    },
    userId: {
      type: [Number, String],
      required: true,
    },
  },
  components: {
    IraiContributorPopup,
    MG,
  },
  data() {
    return {
      isPopupVisible: false, // IraiContributorPopupの表示状態
      isMGVisible: false,    // MGポップアップの表示状態
    };
  },
  methods: {
    togglePopup() {
      this.isPopupVisible = !this.isPopupVisible; // IraiContributorPopupの表示/非表示を切り替え
    },
    toggleMG() {
      this.isMGVisible = !this.isMGVisible; // MGポップアップの表示/非表示を切り替え
    },
    closeMG() {
      this.isMGVisible = false; // MGポップアップを閉じる
    },
    async deleteRequest() {
      // 確認アラートを表示
      if (window.confirm('依頼を削除してよろしいでしょうか？')) {
        try {
          console.log("削除リクエスト caseId:", this.caseId);
          const response = await apiClient.delete(`/case/${this.caseId}`);

          if (response.status === 200) {
            window.alert('依頼が削除されました。ホーム画面へ移動します。');
            this.$router.push('/'); // ホーム画面へ遷移
          } else {
            window.alert('依頼の削除に失敗しました。');
          }
        } catch (error) {
          console.error('削除中にエラーが発生しました:', error);
          if (error.response && error.response.status === 404) {
            window.alert('削除対象の依頼が見つかりませんでした。');
          } else {
            window.alert('削除中にエラーが発生しました。');
          }
        }
      }
    },
  },
  mounted() {
    console.log("[RequesterMenu] caseId:", this.caseId);
    console.log("[RequesterMenu] userId:", this.userId);
  },
};
</script>

<template>
  <div class="menu-category">
    <h4>依頼者</h4>
    <ul>
      ・<button @click="togglePopup" class="popup-trigger">依頼ポイントを追加</button>
      <br />
      ・<button @click="deleteRequest" class="popup-trigger">依頼を削除</button>
      <br />
      ・<button @click="toggleMG" class="popup-trigger">メンバー管理</button>
    </ul>

    <!-- ポップアップ -->
    <IraiContributorPopup
      :isVisible="isPopupVisible"
      @close="togglePopup"
    />

    <!-- MGポップアップ -->
    <div v-if="isMGVisible" class="modal" @click.self="closeMG">
      <div class="modal-content">
        <button class="close-button" @click="closeMG">×</button>
        <MG />
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-category {
  margin-bottom: 15px;
}

.menu-category h4 {
  font-size: 1.1em;
  color: #ff8c00;
  margin-bottom: 10px;
  border-bottom: 2px solid #ff8c00;
  padding-bottom: 5px;
}

.menu-category ul {
  list-style-type: none;
  padding-left: 0;
}

.menu-category ul li {
  margin-bottom: 5px;
  color: #333;
  font-size: 0.9em;
}

.popup-trigger {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9em;
}

.popup-trigger:hover {
  text-decoration: underline;
}

/* モーダル全体のスタイル */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 背景を半透明に */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* モーダルコンテンツのスタイル */
.modal-content {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  max-width: 600px;
  width: 90%;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 閉じるボタン */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.close-button:hover {
  color: #ff0000;
}
</style>