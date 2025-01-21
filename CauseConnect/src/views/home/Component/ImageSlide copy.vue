<!-- <script>
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
</script> -->

<!-- <template>
  <div class="slider-container" @mouseenter="pauseSlide" @mouseleave="resumeSlide">
    無限スクロール用スライド -->
<!-- <div class="slides-wrapper">
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
</template> -->
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import RequestItem from "./ImageSlideItem.vue"; // RequestItemコンポーネントをインポート

// サンプル依頼データ
const requests = reactive([
  { id: 1, name: "地域美化活動", description: "地域の公園を掃除する活動です。", date: "2024-12-01", location: "東京都渋谷区" },
  { id: 2, name: "川の清掃", description: "河川敷のゴミ拾い活動を行います。", date: "2024-12-15", location: "神奈川県横浜市" },
  { id: 3, name: "山のトレイル整備", description: "登山道の整備活動です。", date: "2024-12-20", location: "長野県松本市" },
  { id: 4, name: "森林保護活動", description: "森林の保護を目的とした活動です。", date: "2024-12-25", location: "北海道札幌市" },
  { id: 5, name: "海岸清掃", description: "海岸のゴミ拾い活動です。", date: "2025-01-01", location: "沖縄県那覇市" },
  { id: 6, name: "空港周辺清掃", description: "空港周辺の清掃活動を行います。", date: "2025-01-10", location: "大阪府大阪市" },
]);

// スライド管理用データ
const currentSlide = ref(0); // 現在のスライド位置
const slideWidth = ref(300); // 1つのスライドの幅（300pxに調整）
const gap = 20; // スライド間の余白
const slideWidthWithGap = ref(slideWidth.value + gap); // 幅 + 余白
const visibleSlides = 3; // 表示するスライド数を3に設定

// スライドスタイル計算
const imageWrapperStyle = reactive({
  transform: `translateX(-${currentSlide.value * slideWidthWithGap.value}px)`,
  transition: "transform 0.5s ease-in-out",
});

// スライド操作
const prevSlide = () => {
  // 3回のスライドごとに最初に戻るように変更
  currentSlide.value =
    (currentSlide.value - 1 + visibleSlides) % visibleSlides;
  updateSlideStyle();
};

const nextSlide = () => {
  // 3回のスライドごとに最初に戻るように変更
  currentSlide.value = (currentSlide.value + 1) % visibleSlides;
  updateSlideStyle();
};

// スライド幅の更新
const setSlideWidth = () => {
  const availableWidth = window.innerWidth;
  const maxSlideWidth = Math.min(availableWidth / visibleSlides - gap, 500); // 幅を広げるために最大を500pxに設定
  slideWidth.value = maxSlideWidth; // 各スライドの幅を調整
  slideWidthWithGap.value = slideWidth.value + gap;
  updateSlideStyle();
};

// スライドスタイルの更新
const updateSlideStyle = () => {
  imageWrapperStyle.transform = `translateX(-${
    currentSlide.value * slideWidthWithGap.value
  }px)`;
};

// マウント時のイベントリスナー設定
onMounted(() => {
  setSlideWidth(); // 初期設定
  window.addEventListener("resize", setSlideWidth); // リサイズイベントでスライド幅更新
});

// アンマウント時のクリーンアップ
onBeforeUnmount(() => {
  window.removeEventListener("resize", setSlideWidth); // イベントリスナー削除
});
</script>

<template>
  <div class="carousel-container">
    <!-- スライド表示のためのラッパー -->
    <div class="carousel-wrapper" :style="imageWrapperStyle">
      <!-- 各依頼データをRequestItemコンポーネントとして表示 -->
      <RequestItem
        v-for="(request, index) in requests"
        :key="index"
        :request="request"
        :style="{ width: slideWidth + 'px', marginRight: gap + 'px' }"
      />
    </div>

    <!-- 左右スクロールボタン -->
    <button class="prev" @click="prevSlide" aria-label="Previous Slide">←</button>
    <button class="next" @click="nextSlide" aria-label="Next Slide">→</button>
  </div>
</template>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 24px;
  padding: 10px;
  cursor: pointer;
  z-index: 2;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}
.carousel-wrapper {
  width: 2000px !important; /* 6つ表示で画面サイズ100%のときしか対応できていない */
  margin: 20px;
}
</style>
