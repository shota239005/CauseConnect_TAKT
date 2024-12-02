<template>
  <div class="freetext-container">
    <label for="freetext-input" class="freetext-label">
      {{ label }}
    </label>
    <textarea
      id="freetext-input"
      class="freetext-input"
      v-model="text"
      :placeholder="placeholder"
      :rows="rows"
      :cols="cols"
      maxlength="10000"
      @input="onInput"
    ></textarea>
    <p class="freetext-counter">{{ text.length }} / 10000</p>
  </div>
</template>

<script>
export default {
  name: "FreeText",
  props: {
    label: {
      type: String,
      default: "基本情報",
    },
    placeholder: {
      type: String,
      default: "自由記述",
    },
    rows: {
      type: Number,
      default: 5,
    },
    cols: {
      type: Number,
      default: 30,
    },
  },
  emits: ["update:text"],
  data() {
    return {
      text: "",
    };
  },
  methods: {
    onInput() {
      this.$emit("update:text", this.text);
    },
  },
};
</script>

<style scoped>
.freetext-container {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}

.freetext-label {
  margin-bottom: 5px;
  font-weight: bold;
}

.freetext-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.freetext-counter {
  margin-top: 5px;
  font-size: 14px;
  color: #555;
  text-align: right;
}
</style>
