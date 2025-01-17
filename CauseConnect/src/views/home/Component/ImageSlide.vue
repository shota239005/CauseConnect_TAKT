<script setup>
import { reactive, onMounted } from 'vue';
import apiClient from '@/axios'; // axiosのインポート

// スライドデータを格納するための reactive オブジェクト
const slides = reactive({
  items: [], // 実際に表示するスライドのデータ
});

// サーバーからデータを取得するメソッド
const fetchSlides = async () => {
  try {
    const response = await apiClient.get("/posts");

    const posts = response.data.posts; // postsを取得

    // APIから取得したデータが配列であることを確認
    if (Array.isArray(response.data)) {

      slides.items = response.data.map(item => ({
          case_id: item.case_id,
          title: item.case_name,
          description: item.content,
          point: item.sup_point,
          picture: item.picture || 'src/assets/img/HomeImg.jpg', // 画像がない場合はデフォルト画像を設定
        }))
        .sort((a, b) => a.case_id - b.case_id);

      console.log(slides.items) // データを確認

    } else {
      console.error("APIのレスポンスは配列ではありません", posts);
    }
  } catch (error) {
    console.error("APIの取得中にエラーが発生しました:", error);
  }
};



// コンポーネントがマウントされた後にデータを取得
onMounted(() => {
  fetchSlides();
});

// スライドのアニメーション制御メソッド
const pauseSlide = () => {
  const slidesWrapper = document.querySelector(".slides-wrapper");
  slidesWrapper.style.animationPlayState = "paused";
};

const resumeSlide = () => {
  const slidesWrapper = document.querySelector(".slides-wrapper");
  slidesWrapper.style.animationPlayState = "running";
};

// スライドクリック時のリンク遷移メソッド
const navigateToPage = (slide) => {
  this.$router.push(slide.link || '/default-link');
};
</script>

<template>
  <div class="slider-container" @mouseenter="pauseSlide" @mouseleave="resumeSlide">
    <div class="slides-wrapper">
      <!-- スライドデータを表示 -->
      <div v-for="(slide, index) in slides.items" :key="index" class="slide" @click="navigateToPage(slide)">
        <div class="slide-content">
          <!-- 投稿の画像 -->
          <img :src="slide.picture || 'src/assets/img/HomeImg.jpg'" alt="slide image" class="slide-image" />
          <!-- 投稿のタイトル (case_name) -->
          <h2>{{ slide.title || 'タイトルがありません' }}</h2>
          <!-- 投稿の内容 (content) -->
          <p>{{ slide.description || '内容がありません' }}</p>
          <!-- 投稿の補助ポイント (sup_point) -->
          <p>補助ポイント: {{ slide.point || '不明' }} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider-container {
  position: relative;
  padding-top: 3%;
  width: 100%;
  height: 470px;
  margin-top: -20px;
  margin-bottom: 10px;
  overflow: hidden; /* 画面外のスライドを非表示にする */
}

.slides-wrapper {
  display: flex;
  animation: slide 20s linear infinite;
  animation-play-state: running;
  /* 初期状態ではアニメーションを実行 */
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
  transform: scale(1.1);
  /* マウスオーバー時に拡大 */
  background-color: #ffefde;
}

.slide-content {
  text-align: center;
  color: #333;
  height: 100%;
}

.slide-image {
  width: 500px;
  /* 画像の横幅 */
  height: 200px;
  /* 画像の高さ */
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
