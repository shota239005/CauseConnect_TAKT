<script>

export default {
  data() {
    return {
      hokkaidoTohoku: ["北海道", "青森", "岩手", "秋田", "宮城", "山形", "福島"],
      kanto: ["茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川"],
      chubu: ["新潟", "富山", "石川", "福井", "山梨", "長野", "岐阜", "静岡", "愛知"],
      kansai: ["大阪","京都", "兵庫", "奈良", "和歌山","三重", "滋賀"  ],
      shikoku: ["徳島", "香川", "愛媛", "高知"],
      chugoku: ["鳥取", "島根", "岡山", "広島", "山口"],
      kyushu: ["福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄"],
    };
  },
};
</script>

<template>
    <div class="map-container">
      <!-- 日本地図背景 -->
      <img src="@/assets/img/japan.png" alt="日本地図" class="japan-map" />

      <!-- 北海道・東北 -->
      <div class="region region-hokkaido">
        <div class="region-header">
          <h2>北海道・東北</h2>
          <div class="buttons">
            <button v-for="(pref, index) in hokkaidoTohoku" :key="index" class="pref-button">{{ pref }}</button>
          </div>
        </div>
      </div>

      <!-- 関東 -->
      <div class="region region-kanto">
        <div class="region-header">
          <h2>　　　　関東</h2>
          <div class="buttons">
            <button v-for="(pref, index) in kanto" :key="index" class="pref-button">{{ pref }}</button>
          </div>
        </div>
      </div>

      <!-- 中部 -->
      <div class="region region-chubu">
        <div class="region-header">
          <h2>　　　　中部</h2>
          <div class="buttons">
            <button v-for="(pref, index) in chubu" :key="index" class="pref-button">{{ pref }}</button>
          </div>
        </div>
      </div>

      <!-- 関西 -->
      <div class="region region-kansai">
        <div class="region-header">
          <h2>　　　　関西</h2>
          <div class="buttons">
            <button v-for="(pref, index) in kansai" :key="index" class="pref-button">{{ pref }}</button>
          </div>
        </div>
      </div>

      <!-- 四国 -->
      <div class="region region-shikoku">
        <div class="region-header">
          <h2>　　　　四国</h2>
          <div class="buttons">
            <button v-for="(pref, index) in shikoku" :key="index" class="pref-button">{{ pref }}</button>
          </div>
        </div>
      </div>

      <!-- 中国 -->
      <div class="region region-chugoku">
        <div class="region-header">
          <h2>　　　　中国</h2>
          <div class="buttons">
            <button v-for="(pref, index) in chugoku" :key="index" class="pref-button">{{ pref }}</button>
          </div>
        </div>
      </div>

      <!-- 九州・沖縄 -->
      <div class="region region-kyushu">
        <div class="region-header">
          <h2>　九州・沖縄</h2>
          <div class="buttons">
            <button v-for="(pref, index) in kyushu" :key="index" class="pref-button">{{ pref }}</button>
          </div>
        </div>
      </div>
    </div>

  </template>


  <style scoped>
  .map-container {
    position: relative;
    width: 100%;
    max-width: 1000px;
    margin-left: 100px;
    margin-top: 20px;
    text-align: left;
  }

  .japan-map {
    width: 100%;
    height: 500px;
  }


  .region {
    position: absolute;
    color: white;
    margin-top: 15px; /* 地域ごとの間隔を縮める */
    left: 10%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .region-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px; /* タイトルとボタンの間隔を縮める */
  }

  .region h2 {
    color: black;
    margin-right: 5px; /* タイトルとボタンの間隔を縮める */
  }

  .buttons {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }

  .pref-button {
    font-family: "Zen Maru Gothic", serif;

    background-color: rgb(255, 255, 255);
    color: #f7a400;
    border: 2px solid #f7a400;
    border-radius: 5px;
    padding: 5px 10px;
    display: inline-block; /* ボタンのサイズをテキストに依存しないようにする */
    margin: 2px; /* ボタン間の間隔を縮める */
    cursor: pointer;
    font-size: 20px;
    transition: 0.3s ease-in-out;
    box-shadow: 5px 5px 0 #ff8c00;


  }

  .pref-button::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0;
  display: block;
  background: #ff8c00;
  transition: 0.3s;
  left: 0;
}

.pref-button:hover {
  color: #333;
  background-color: #ff8c00;
  box-shadow: 0 0 0;
  transform: translate(5px, 5px);
}


  /* 地域ごとの位置調整 */
  .region-hokkaido {
    margin-top: -20px;
    top: 5%;
  }

  .region-kanto {
    top: 12%;
  }

  .region-chubu {
    margin-top: -5px;
    top: 30%;
  }

  .region-kansai {
    top: 40%;
  }

  .region-shikoku {
    top: 53%;
  }

  .region-chugoku {
    top: 65%;
  }

  .region-kyushu {
    top: 78%;
  }
  </style>
