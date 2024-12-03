<script>
import ContributorPopup from "./ContributorPopup.vue";

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
</style>
