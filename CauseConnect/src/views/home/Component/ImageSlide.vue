
<script>
import p1Img from '@/assets/img/basyo.png';
import p2Img from '@/assets/img/kawa.jpg';
import p3Img from '@/assets/img/HomeImg.jpg';
import p4Img from '@/assets/img/mori.jpg';
import p5Img from '@/assets/img/umi.jpg';

export default {
  data() {
    return {
      slides: [
        { title: "地域美化活動", description: "地域の公園を掃除する活動です", image: p1Img, link: "/details/basyo" },
        { title: "川の清掃", description: "河川敷のゴミ拾い活動を行います", image: p2Img, link: "/details/kawa" },
        { title: "山のトレイル整備", description: "登山道の整備活動です", image: p3Img, link: "/details/trail" },
        { title: "森林保護活動", description: "森林の保護を目的とした活動です", image: p4Img, link: "/details/mori" },
        { title: "海岸清掃", description: "海岸のゴミ拾い活動です", image: p5Img, link: "/details/umi" },
      ],
    };
  },
  methods: {
    pauseSlide() {
      const slidesWrapper = document.querySelector('.slides-wrapper');
      slidesWrapper.style.animationPlayState = 'paused';
    },
    resumeSlide() {
      const slidesWrapper = document.querySelector('.slides-wrapper');
      slidesWrapper.style.animationPlayState = 'running';
    },
    navigateToPage(slide) {
      // クリックされたスライドに対応するページに遷移
      this.$router.push(slide.link);
    }
  },
};
</script>

<template>
  <div class="slider-container" @mouseenter="pauseSlide" @mouseleave="resumeSlide">
    <!-- 無限スクロール用スライド -->
    <div class="slides-wrapper">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="slide"
        @click="navigateToPage(slide)"
      >
        <div class="slide-content">
          <img :src="slide.image" alt="slide image" class="slide-image" />
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.description }}</p>
          <p>現在の総額ポイント：８００P</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.slider-container {
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 40px;
}

.slides-wrapper {
  display: flex;
  animation: slide 20s linear infinite;
  animation-play-state: running; /* 初期状態ではアニメーションを実行 */
}

.slide {
  width: 50%;
  height: 100%;
  flex-shrink: 0;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border: 3px solid #f7a400;
  border-radius: 10px;
  box-shadow: 0 2px 5px #ff8c00;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}

.slide:hover {
  transform: scale(1.1); /* マウスオーバー時に拡大 */
  background-color: #ffefde;
}

.slide-content {
  text-align: center;
  color: #333;
  height: 100%;
}

.slide-image {
  width: 500px; /* 画像の横幅 */
  height: 200px; /* 画像の高さ */
  border-radius: 8px;
  margin-bottom: 10px;
  object-fit: cover;
  object-position: center;
}


@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
