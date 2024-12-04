<script>
export default {
  data() {
    return {
      symbols: ['🍒', '🍋', '🍉', '🍇', '🔔', '7️⃣'], // シンボル一覧
      reels: ['🍒', '🍋', '7️⃣'], // 初期シンボル
      resultMessage: '揃えてハッピー！レッツチャレンジ！！', // 初期メッセージ（スピン前）
      isSpinning: false, // スピン状態
      payouts: {
        '🍒': 10, // 🍒の配当
        '🍋': 20, // 🍋の配当
        '🍉': 30, // 🍉の配当
        '🍇': 40, // 🍇の配当
        '🔔': 50, // 🔔の配当
        '7️⃣': 100, // 7️⃣の配当
      },
    };
  },
  methods: {
    async spin() {
      this.resultMessage = 'グッドラック！'; // ボタン押したらグッドラック
      this.isSpinning = true; // スピン開始

      const spinDuration = 1; // スピンの時間（秒）
      const spinCount = 10; // スピン回数

      // リールをアニメーション
      await this.animateReels(spinCount, spinDuration);

      // スピン後にランダムにシンボルを決定
      this.reels = this.reels.map(() => this.getRandomSymbol());
      this.checkWin();
      this.isSpinning = false; // スピン終了
    },

    // リールのアニメーション処理（加速と減速）
    animateReels(spinCount, spinDuration) {
      return new Promise(resolve => {
        let counter = 0;
        let intervalSpeed = (spinDuration * 1000) / spinCount; // スピン時間に基づいてインターバルの速度を設定

        const minInterval = 50; // 最小インターバル（最大スピード）
        const maxInterval = 300; // 最大インターバル（最小スピード）

        // 最初は加速、後に減速
        const interval = setInterval(() => {
          // リールをランダムなシンボルで更新
          this.reels = this.reels.map(() => this.getRandomSymbol());
          counter++;

          // 加速時は急速に速く、減速時は緩やかに遅くなるように制御
          if (counter < spinCount / 2) {
            // 加速：指数的に増加
            intervalSpeed = Math.max(
              minInterval,
              maxInterval * Math.pow(0.8, counter) // counterが増えるごとにスピードを上げる
            );
          } else {
            // 減速：指数的に減少
            intervalSpeed = Math.min(
              maxInterval,
              maxInterval - Math.pow(0.8, spinCount - counter) * (maxInterval - minInterval) // 減速部分
            );
          }

          // 指定回数のスピンが終わったらアニメーションを停止
          if (counter >= spinCount) {
            clearInterval(interval);
            resolve();
          }
        }, intervalSpeed); // 変動するインターバルを使ってリールを更新
      });
    },

    // ランダムにシンボルを選ぶ（重み付け）
    getRandomSymbol() {
      const probabilities = {
        '🍒': 0.5, // 🍒が出る確率 50%
        '🍋': 0.1, // 🍋が出る確率 10%
        '🍉': 0.1, // 🍉が出る確率 10%
        '🍇': 0.1, // 🍇が出る確率 10%
        '🔔': 0.1, // 🔔が出る確率 10%
        '7️⃣': 0.1,  // 7️⃣が出る確率 10%
      };

      const random = Math.random(); // ランダムな値 (0 - 1)
      let cumulativeProbability = 0;

      // 確率に基づいてシンボルを選ぶ
      for (const [symbol, probability] of Object.entries(probabilities)) {
        cumulativeProbability += probability;
        if (random <= cumulativeProbability) {
          return symbol;
        }
      }
    },

    // 勝敗の判定と配当の計算
    checkWin() {
      // 全てのリールが同じシンボルで揃った場合
      const symbol = this.reels[0];
      const allSame = this.reels.every(s => s === symbol);

      if (allSame) {
        const payout = this.payouts[symbol];
        this.resultMessage = `おめでとう！ポイント配当は ${payout} Ｐです。`;
      } else {
        this.resultMessage = '残念！もう一度試してね！';
      }
    }
  }
};
</script>

<template>
  <div class="slot-machine">
    <div v-if="resultMessage" class="result-message">
      {{ resultMessage }}
    </div>
    <div class="reels">
      <div class="reel" v-for="(reel, index) in reels" :key="index" :class="{'spinning': isSpinning}">
        <div class="symbol">{{ reel }}</div>
      </div>
    </div>
    <button class="btn1" @click="spin" :disabled="isSpinning">スピン</button>
  </div>
</template>

<style scoped>
.slot-machine {
  text-align: center;
  font-family: Arial, sans-serif;
}

.reels {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.reel {
  width: 80px;
  height: 80px;
  margin: 0 10px;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 8px;
  position: relative;
}

.symbol {
  transition: transform 0.3s ease-in-out;
}

/* スピンアニメーション */
.reel.spinning {
  animation: spin 1s cubic-bezier(0.6, 0.2, 0.2, 1) infinite; /* リールの回転を無限に繰り返す */
}

/* リールを回転させるアニメーション */
@keyframes spin {
  0% { transform: rotateX(0deg); }
  100% { transform: rotateX(1080deg); }
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #8fe96b;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #ff8c00;
}

button:disabled {
  background-color: #9b9b9b;
  cursor: not-allowed;
}

.result-message {
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff5722;
}
</style>
