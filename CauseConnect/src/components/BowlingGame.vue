<template>
  <div class="bowling-game">
    <h1>Bowling Game</h1>
    <div class="game-content">
      <!-- スコアボード -->
      <div class="score-board">
        <h2>Score Board</h2>
        <div class="frames">
          <div v-for="(frame, index) in frames" :key="index" class="frame">
            <p>Frame {{ index + 1 }}</p>
            <p>First Roll: {{ frame.firstRoll === 10 ? "X" : frame.firstRoll }}</p>
            <p>
              Second Roll:
              {{
                frame.firstRoll === 10
                  ? "-"
                  : (frame.firstRoll || 0) + (frame.secondRoll || 0) === 10
                  ? "/"
                  : frame.secondRoll
              }}
            </p>
            <p v-if="index === 9 && frame.extraRoll !== null">Extra Roll: {{ frame.extraRoll }}</p>
            <p>Frame Score: {{ frameScores[index] !== null ? frameScores[index] : "-" }}</p>
          </div>
        </div>
        <!-- 合計スコアを表示する -->
        <div class="total-score">
          <h3>Total Score</h3>
          <p>{{ totalScore }}</p>
        </div>
      </div>

      <!-- 入力コントローラー -->
      <div class="game-controller">
        <h2>Input Rolls</h2>
        <div v-for="(frame, index) in frames" :key="index" class="frame-input">
          <p>Frame {{ index + 1 }}</p>
          <input
            v-model.number="frame.firstRoll"
            type="number"
            min="0"
            max="10"
            placeholder="First Roll"
            @input="updateScore"
          />
          <input
            v-if="index < 9"
            v-model.number="frame.secondRoll"
            type="number"
            :min="0"
            :max="10 - (frame.firstRoll || 0)"
            placeholder="Second Roll"
            @input="updateScore"
          />
          <input
            v-if="index === 9"
            v-model.number="frame.secondRoll"
            type="number"
            min="0"
            max="10"
            placeholder="Second Roll"
            @input="updateScore"
          />
          <input
            v-if="index === 9 && (frame.firstRoll === 10 || (frame.firstRoll || 0) + (frame.secondRoll || 0) === 10)"
            v-model.number="frame.extraRoll"
            type="number"
            min="0"
            max="10"
            placeholder="Extra Roll"
            @input="updateScore"
          />
        </div>
        <button @click="throwBall">Throw Ball</button>
      </div>
    </div>

    <!-- アニメーション用のレーンとボール -->
    <div class="lane">
      <div v-if="isBallRolling" class="ball" :style="ballStyle"></div>
      <div class="pins">
        <div
          v-for="pin in pins"
          :key="pin.id"
          :class="['pin', { 'fall': pin.fallen }]"
          :style="pinStyle(pin)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BowlingGame",
  data() {
    return {
      frames: Array.from({ length: 10 }, () => ({
        firstRoll: null,
        secondRoll: null,
        extraRoll: null, // 最終フレーム用
      })),
      frameScores: Array(10).fill(null), // 各フレームのスコア
      totalScore: 0, // 合計スコア
      isBallRolling: false, // ボールが転がっているか
      ballStyle: {
        left: '0px',
        transform: 'translateX(0)',
      },
      pins: Array(10).fill(null).map((_, index) => ({
        id: index,
        fallen: false,
      })),
    };
  },
  methods: {
    // スコア更新
    updateScore() {
      this.calculateFrameScores();
      this.calculateTotalScore();
    },

    // ボールを投げる処理
    throwBall() {
      this.isBallRolling = true;
      this.animateBall();
    },

    // ボールのアニメーション
    animateBall() {
      setTimeout(() => {
        this.ballStyle = {
          ...this.ballStyle,
          left: '90%', // 90%まで移動
        };
        this.checkPins();
      }, 100);

      setTimeout(() => {
        this.isBallRolling = false;
        this.resetBall();
      }, 2000); // ボールアニメーション後にボールをリセット
    },

    // ピンが倒れるかどうかのチェック
    checkPins() {
      this.pins.forEach((pin, index) => {
        // 偶然の例として、ランダムにピンを倒す
        if (Math.random() > 0.5) {
          this.pins[index].fallen = true;
        }
      });
    },

    // ピンの位置スタイル
    pinStyle(pin) {
      const positions = [
        { top: '10%', left: '50%' }, // 1番目
        { top: '30%', left: '40%' }, // 2番目
        { top: '30%', left: '60%' }, // 3番目
        { top: '50%', left: '30%' }, // 4番目
        { top: '50%', left: '50%' }, // 5番目
        { top: '50%', left: '70%' }, // 6番目
        { top: '70%', left: '20%' }, // 7番目
        { top: '70%', left: '40%' }, // 8番目
        { top: '70%', left: '60%' }, // 9番目
        { top: '70%', left: '80%' }, // 10番目
      ];
      return {
        top: positions[pin.id].top,
        left: positions[pin.id].left,
        position: 'absolute',
      };
    },

    // ボール位置をリセット
    resetBall() {
      this.ballStyle = {
        left: '0px',
        transform: 'translateX(0)',
      };
      this.pins.forEach(pin => pin.fallen = false); // ピンを元に戻す
    },

    // 各フレームのスコアを計算
    calculateFrameScores() {
      this.frameScores = this.frames.map((frame, index) => {
        const nextFrame = this.frames[index + 1] || {};
        const afterNextFrame = this.frames[index + 2] || {};

        if (index === 9) {
          // 最終フレーム
          return (
            (frame.firstRoll || 0) +
            (frame.secondRoll || 0) +
            (frame.extraRoll || 0)
          );
        }

        if (frame.firstRoll === 10) {
          // ストライク
          const nextFirstRoll = nextFrame.firstRoll || 0;
          const nextSecondRoll =
            nextFrame.secondRoll !== null
              ? nextFrame.secondRoll
              : afterNextFrame.firstRoll || 0;
          return 10 + nextFirstRoll + nextSecondRoll;
        }

        if ((frame.firstRoll || 0) + (frame.secondRoll || 0) === 10) {
          // スペア
          return 10 + (nextFrame.firstRoll || 0);
        }

        if (frame.firstRoll !== null && frame.secondRoll !== null) {
          // 通常
          return (frame.firstRoll || 0) + (frame.secondRoll || 0);
        }

        return null; // スコア未確定
      });
    },

    // 合計スコアを計算
    calculateTotalScore() {
      this.totalScore = this.frameScores.reduce(
        (sum, score) => sum + (score || 0),
        0
      );
    },
  },
};
</script>

<style scoped>
/* レーン、ピン、ボールのアニメーション */
.lane {
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #e0e0e0;
  margin-top: 20px;
}

.pins {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translateX(-50%) translateY(-50%);
}

.pin {
  width: 10px;
  height: 30px;
  background-color: #ff6347;
  border-radius: 3px;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.pin.fall {
  transform: rotate(45deg) translateY(20px);
  opacity: 0;
}

.ball {
  width: 40px;
  height: 40px;
  background-color: #007bff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 0;
  transition: transform 1s ease, left 1s ease;
}

.total-score {
  margin-top: 20px;
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
}
</style>
