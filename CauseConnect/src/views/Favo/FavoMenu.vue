<script>
import ContributorPopup from "./FavoPopup.vue";

export default {
  name: "ContributorMenu",
  components: {
    ContributorPopup,
  },
  data() {
    return {
      isPopupVisible: false, // ポップアップの表示状態
    };
  },
  methods: {
    togglePopup() {
      this.isPopupVisible = !this.isPopupVisible; // ポップアップの表示/非表示を切り替え
    },
  },
};
</script>

<template>
  <div class="menu-category">
    <h4>出資者</h4>
    <ul>
      <li>
        ・<button @click="togglePopup" class="popup-trigger">出資ポイントを追加</button>
      </li>
    </ul>

    <!-- ポップアップ -->
    <ContributorPopup
      :isVisible="isPopupVisible"
      @close="togglePopup"
    />
  </div>
</template>

<style scoped>
.favo-menu {
  padding: 20px;
  font-family: "Zen Maru Gothic", sans-serif;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.no-favorites {
  text-align: center;
  color: #777;
  font-size: 16px;
}

.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.request-item {
  display: flex;
  gap: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
}

.request-image img {
  width: 150px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
}

.request-info {
  flex-grow: 1;
}

.request-info h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #333;
}

.request-info p {
  margin: 5px 0;
  font-size: 14px;
}

.details-link {
  display: inline-block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
}

.details-link:hover {
  text-decoration: underline;
}
</style>
