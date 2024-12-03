<script>
export default {
  name: "ContributorPopup",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close"],
  data() {
    return {
      points: "", // 入力されたポイント数
    };
  },
  methods: {
    addPoints() {
      if (this.points) {
        alert(`${this.points} ポイントを追加しました！`);
        this.points = ""; // 入力欄をリセット
        this.$emit("close"); // ポップアップを閉じる
      } else {
        alert("ポイントを入力してください");
      }
    },
    cancel() {
      this.$emit("close"); // ポップアップを閉じる
    },
  },
};
</script>

<template>
  <div v-if="isVisible" class="popup-overlay" @click.self="$emit('close')">
    <div class="popup-content">
      <h3>出資ポイントを追加</h3>
      <p>追加するポイント数を入力してください。</p>
      <div class="form-group">
        <input type="number" v-model="points" placeholder="ポイント数" class="input-field" />
      </div>
      <div class="button-group">
        <button @click="addPoints" class="confirm-button">追加</button>
        <button @click="cancel" class="cancel-button">キャンセル</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;

  -moz-appearance: textfield;
  /* Firefox用 */
}

.input-field::-webkit-inner-spin-button,
.input-field::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 300px;
}

h3 {
  margin-bottom: 15px;
}

p {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.confirm-button {
  background-color: #7ed957;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
}

.confirm-button:hover {
  background-color: #6cc84b;
}

.cancel-button {
  background-color: #ff8c00;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
}

.cancel-button:hover {
  background-color: #e67600;
}
</style>
