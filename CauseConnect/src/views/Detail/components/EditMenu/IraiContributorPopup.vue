<script>
export default {
  name: "IraiContributorPopup",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    iraiPoint: { // 現在のポイントを親コンポーネントから受け取る
      type: Number,
      required: true,
    },
    balancePoints: { // 保有ポイントを親コンポーネントから受け取る
      type: Number,
      required: true,
    },
  },
  emits: ["close"],
  data() {
    return {
      points: "", // 入力されたポイント数
    };
  },
  computed: {
    sumPoints() {
      // 現在のポイントと入力されたポイントの合計を計算
      return this.iraiPoint + (parseInt(this.points) || 0);
    },
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
  <div v-if="isVisible" class="overlay" @click.self="$emit('close')">
    <div class="iraiPoint-popup" @click.stop>
      <h1>現在のポイント {{ iraiPoint }} からいくら追加しますか？</h1>

      <!-- 保有ポイントの表示 -->
      <p>保有ポイント：{{ balancePoints }} ポイント</p>

      <!-- ポイント入力フォーム -->
      <form>
        <label for="points">ポイント：</label>
        <input
          type="number"
          id="points"
          v-model="points"
          placeholder="ポイントを入力"
          class="input-field"
        />
        <p>{{ iraiPoint }} + {{ points || 0 }} = {{ sumPoints }}</p>
      </form>

      <div class="button-container">
        <button class="confirm-button" @click="addPoints">追加</button>

        <button class="cancel-button" @click="cancel">キャンセル</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 2px solid #ccc;
  margin-top: 10px;
  margin-right: 40px;
}

.input-field::-webkit-inner-spin-button,
.input-field::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.iraiPoint-popup {
  background-color: white;
  border: 2px solid #f7a400;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 90%;
}

h1 {
  font-size: 20px;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

form {
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.cancel-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: white;
  border: 2px solid #d32f2f;
  color: red;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-button {
  padding: 10px 40px;
  font-size: 16px;
  background-color: #f7a400;
  color: white;
  border: 2px solid #ff8c00;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #d32f2f;
  color: white;
}

.confirm-button:hover {
  background-color: #e47e00;
}
</style>
