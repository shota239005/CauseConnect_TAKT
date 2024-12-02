<script>
import image1 from '@/assets/img/Juggler/1.png';
import image2 from '@/assets/img/Juggler/2.png';
import image3 from '@/assets/img/Juggler/3.png';
import image4 from '@/assets/img/Juggler/4.png';
import image5 from '@/assets/img/Juggler/5.png';
import image6 from '@/assets/img/Juggler/6.png';
import image7 from '@/assets/img/Juggler/7.png';

export default {
  data() {
    return {
      images: [image1, image2, image3, image4, image5, image6, image7],
      leftImage: '',
      centerImage: '',
      rightImage: '',
      totalCount: 150, // 保有枚数の初期設定
      spinning: false, // スロットが回転中かどうか
      payout: 0, // 配当金
      message: '', // 結果メッセージ
    };
  },
  created() {
    // 初期設定の確率で画像を決める
    this.setRandomImages();
  },
  methods: {
    setRandomImages() {
      // 確率設定（合計で100になるように設定）
      const randomChance = Math.random(); // 0～1の間でランダムに生成

      if (randomChance < 0.30) {
        // 30% の確率で "image6, image6, image6" を設定
        this.leftImage = image1;
        this.centerImage = image1;
        this.rightImage = image1;
      } else if (randomChance < 0.50) {
        // 20% の確率で "image7, image7, image7" を設定
        this.leftImage = image7;
        this.centerImage = image7;
        this.rightImage = image7;
      } else {
        // 残りの50% でランダムな組み合わせを設定
        this.leftImage = this.images[Math.floor(Math.random() * this.images.length)];
        this.centerImage = this.images[Math.floor(Math.random() * this.images.length)];
        this.rightImage = this.images[Math.floor(Math.random() * this.images.length)];
      }
    },

    handleClick() {
      if (this.totalCount >= 3) {
        this.totalCount -= 3; // 保有枚数を-3する
        this.startSlotMachine(); // スロットを開始する
      } else {
        alert('保有枚数が足りません！');
      }
    },
    startSlotMachine() {
      this.spinning = true; // スロット回転開始

      const spinTime = 1500; // スロットの回転時間（全体での時間）

      // 各スロットを順番に回転させる
      let spinCount = 0;
      const spinInterval = setInterval(() => {
        this.leftImage = this.images[Math.floor(Math.random() * this.images.length)];
        this.centerImage = this.images[Math.floor(Math.random() * this.images.length)];
        this.rightImage = this.images[Math.floor(Math.random() * this.images.length)];

        spinCount++;

        if (spinCount >= 10) { // 10回スピンしたら停止
          clearInterval(spinInterval);
          this.stopSlotMachine(); // スロット停止
          this.checkPayout(); // 配当チェック
        }
      }, 100); // 100msごとに画像を更新

      // 各スロットが順番に止まるように遅延を追加
      setTimeout(() => {
        this.stopLeft(); // 左が確定
      }, 400); // 0.4秒後にleftを確定

      setTimeout(() => {
        this.stopCenter(); // 中央が確定
      }, 800); // 0.8秒後にcenterを確定

      setTimeout(() => {
        this.stopRight(); // 右が確定
      }, 900); // 0.9秒後にrightを確定
    },
    stopSlotMachine() {
      this.spinning = false; // スロット回転停止
    },
    stopLeft() {
      // スロット停止時、最初に決めた画像に戻す
      this.leftImage = this.leftImage;
    },
    stopCenter() {
      this.centerImage = this.centerImage;
    },
    stopRight() {
      this.rightImage = this.rightImage;
    },
    checkPayout() {
      // 配当チェック（3つのスロットが揃った場合）
      if (this.leftImage === this.centerImage && this.centerImage === this.rightImage) {
        // 揃った場合の配当
        this.calculatePayout();
      } else {
        this.payout = 0;
        this.message = '残念！外れです。';
      }
    },
    calculatePayout() {
      // 画像に応じた配当金額を設定
      if (this.leftImage === image1) {
        this.payout = 3;
        this.message = 'もう一回！配当金: 3枚';
      } else if (this.leftImage === image2) {
        this.payout = 8;
        this.message = 'ぶどう！配当金: 8枚';
      } else if (this.leftImage === image3) {
        this.payout = 4;
        this.message = 'チェリー！配当金: 4枚';
      } else if (this.leftImage === image4) {
        this.payout = 14;
        this.message = 'ベル！配当金: 14枚';
      } else if (this.leftImage === image5) {
        this.payout = 96;
        this.message = '当たり！5の画像が揃いました！配当金: 100';
      } else if (this.leftImage === image6) {
        this.payout = 2400;
        this.message = '革命！！配当金: 2400枚！！！';
      } else if (this.leftImage === image7) {
        this.payout = 240;
        this.message = 'BIG BOUNUS！配当金: 240';
      }
      this.totalCount += this.payout; // 配当を追加
    },
  },
};
</script>

<template>
  <div class="gamen">
    <button class="btn1" @click="handleClick" :disabled="totalCount < 3">●</button>
    <div class="left">
      <img ref="leftImg" :src="leftImage" alt="Left Image" :class="{'spinning': spinning}" />
    </div>
    <div class="center">
      <img ref="centerImg" :src="centerImage" alt="Center Image" :class="{'spinning': spinning}" />
    </div>
    <div class="right">
      <img ref="rightImg" :src="rightImage" alt="Right Image" :class="{'spinning': spinning}" />
    </div>
  </div>
  <p>保有枚数: {{ totalCount }}</p> <!-- 保有枚数を表示 -->
  <p>結果: {{ message }}</p> <!-- 配当結果を表示 -->
  <p>配当金: {{ payout }}</p> <!-- 配当金額を表示 -->
</template>

<style scoped>
.gamen {
  display: flex;
  align-items: center;
  margin: 20px;
}
.btn1 {
  margin-right: 20px;
  width: 50px; /* ボタンの横幅 */
  height: 50px; /* ボタンの高さ（幅と同じにすることで円形に） */
  border-radius: 50%; /* 円形にする */
  border: 2px solid #000; /* ボタンの枠線 */
  display: flex; /* 中央揃えに必要 */
  justify-content: center; /* 水平中央揃え */
  align-items: center; /* 垂直中央揃え */
  background-color: #000000; /* 背景色 */
  cursor: pointer; /* ポインタカーソルを表示 */
  font-size: 16px; /* ボタン内テキストのサイズ */
}

.btn1:hover {
  background-color: #000000; /* ホバー時の背景色 */
}

.left, .center, .right {
  width: 100px; /* 画像サイズに応じて調整 */
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.spinning {
  animation: spin 0.1s infinite; /* 画像をスピンさせるアニメーション */
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
