<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  computed: {
    mapUrl: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>

<template>
  <div class="map-url-form">
    <label for="map-url">GoogleMapのURLを入力すると、地図が表示されます。</label>
    <br />
    <input
      type="url"
      id="map-url"
      v-model="mapUrl"
      placeholder="地図のURLを入力してください"
      required
    />
    <div v-if="mapUrl" class="map-preview">
      <iframe
        :src="mapUrl"
        width="858px"
        height="400px"
        frameborder="0"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
#map-url {
  width: 838px;
}

.map-url-form {
  font-family: "Zen Maru Gothic", serif;
  margin-top: 20px;
}

.map-url-form label {
  font-weight: bold;
}

.map-url-form input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.map-preview iframe {
  margin-top: 20px;
  border-radius: 5px;
}
</style>
