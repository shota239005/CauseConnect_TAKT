<script setup>
import {ref, reactive, onMounted } from 'vue';
import apiClient from '@/axios'; // axiosのインポート

// スライドデータを格納するための reactive オブジェクト
const slides = reactive({
  items: [], // 実際に表示するスライドのデータ
});
const caseIds = ref([]); // case_id を格納するための変数
// サーバーからデータを取得するメソッド
const fetchSlides = async () => {
  try {
    const response = await apiClient.get("/posts");

    // APIから取得したデータが配列であることを確認
    if (Array.isArray(response.data)) {
      slides.items = await Promise.all(
        response.data.map(async (item) => {
          // 個別の画像を取得
          let picture = 'src/assets/img/HomeImg.jpg'; // デフォルト画像
          try {
            const imageResponse = await apiClient.get(`/images/${item.case_id}/1`);
            if (imageResponse.data && imageResponse.data.picture) {
              const baseURL = (apiClient.defaults.baseURL || "").replace(/\/api$/, "");
              picture = `${baseURL}${imageResponse.data.picture}`;
            }
          } catch {
            console.warn(`[WARN] 画像を取得できませんでした (case_id: ${item.case_id})`);
          }

          return {
            case_id: item.case_id,
            case_name: item.case_name,
            content: item.content,
            point: item.sup_point,
            picture_type: item.picture_type,
            picture, // 取得した画像 URL を格納
          };
        })
      );

      // point 昇順で並び替え
      slides.items.sort((a, b) => b.point - a.point);

      console.log('[DEBUG] スライドデータ１上:', slides.items);
    } else {
      console.error("APIのレスポンスは配列ではありません", response.data.posts);
    }
  } catch (error) {
    console.error("APIの取得中にエラーが発生しました:", error);
  }
};
// 画像データ用の変数（タイプ1）
const imageUrlType1 = ref('');


// APIから画像データを取得する関数（特定のスライドの case_id を指定）
const fetchImage = async (caseId) => {
  console.log(caseId);
  try {
    const baseURL = (apiClient.defaults.baseURL || "").replace(/\/api$/, "");

    // ピクチャータイプ1の画像取得
    const responseType = await apiClient.get(`/images/${caseId}/1`);
    if (responseType.data && responseType.data.picture) {
      imageUrlType1.value = `${baseURL}${responseType.data.picture}`;
      console.log('[DEBUG] ピクチャータイプ1の画像取得成功:', imageUrlType1.value);
    } else {
      console.warn('[WARN] ピクチャータイプ1の画像が存在しません');
      imageUrlType1.value = "/default-avatar.png"; // デフォルト画像
    }
  } catch (error) {
    console.error('[ERROR] 画像の取得に失敗しました:', error);

    // 404エラーの場合にのみデフォルト画像を設定
    if (error.response && error.response.status === 404) {
      console.warn('[WARN] 画像が見つかりません (404 Not Found)');
    }

    // どんなエラーでもデフォルト画像を設定
    imageUrlType1.value = "/default-avatar.png";
  }
};
// コンポーネントがマウントされた後にデータを取得
onMounted(async () => { // async を追加
  await fetchSlides(); // データ取得を待つ

  // データ取得後に slides.items を確認して最初のスライドの画像を取得
  if (slides.items.length > 0) {
    const firstCaseId = slides.items[0].case_id;
    await fetchImage(firstCaseId); // 最初のスライドの画像を取得
  }
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
          <h2>{{ slide.case_name || 'タイトルがありません' }}</h2>
          <!-- 投稿の内容 (content) -->
          <p>{{ slide.content || '内容がありません' }}</p>
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
