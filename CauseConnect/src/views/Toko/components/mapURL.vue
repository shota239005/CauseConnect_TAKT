<script>
export default {
  data() {
    return {
      // 最初に表示する地図URLを設定
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3336.9402313198366!2d131.59498278885496!3d33.2418692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3546a1b56e090a53%3A0xf6ea0ca5831fdae!2zSVZZ5aSn5YiG6auY5bqm44Kz44Oz44OU44Ol44O844K_5bCC6ZaA5a2m5qCh!5e0!3m2!1sja!2sjp!4v1732509380190!5m2!1sja!2sjp'
    };
  },
  methods: {
    showMap() {
      if (!this.mapUrl) {
        alert('URLを入力してください');
        return;
      }
    }
  }
};
</script>

<template>
    <div class="map-url-form">
      <label for="map-url">地図URLを入力</label>
      <br>
      <input
        type="url"
        id="map-url"
        v-model="mapUrl"
        placeholder="地図のURLを入力してください"
        required
      />
      <!--<button @click="showMap">地図を表示</button>-->

      <div v-if="mapUrl" class="map-preview">
        <iframe :src="mapUrl" width="858px" height="400px" frameborder="0" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
      </div>
    </div>
  </template>


  <style scoped>
  #map-url{
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
