<script setup>
import { ref } from 'vue';
import DOMPurify from 'dompurify';

// FAQデータのリスト
const faqList = [
  {
    question: "アカウントの作成方法は？",
    answer: "<strong>アカウントはトップページから「登録」ボタンをクリックして、\n必要な情報を入力することで作成できます。",
  },
  {
    question: "パスワードを忘れた場合どうすればいいですか？",
    answer: "<strong>ログイン画面で「パスワードを忘れた場合」をクリックし、\n登録したメールアドレスを入力してください。リセットリンクをお送りいたします。",
  },
  {
    question: "料金はどのように支払うのですか？",
    answer: "<strong>クレジットカードや銀行振込など、\nいくつかの支払い方法をご用意しています。詳細は支払いページをご確認ください。",
  },
];

// アコーディオンの開閉状態を管理
const activeIndex = ref(null);

// 質問のクリック時に答えの表示を切り替える関数
function toggleAnswer(index) {
  activeIndex.value = activeIndex.value === index ? null : index;
}

// 答えのフォーマットを処理しつつサニタイズ
function formatAnswer(text) {
  // 改行文字を安全にHTMLの <br> タグに変換
  const safeHtml = DOMPurify.sanitize(text.replace(/\n/g, '<br>'));
  return safeHtml;
}
</script>

<template>
  <div class="faq-container">
    <h2 class="faq-title">よくある質問 (FAQ)</h2>
    <div class="faq-item" v-for="(item, index) in faqList" :key="index">
      <div class="faq-question" @click="toggleAnswer(index)">
        <span>{{ item.question }}</span>
        <!-- 矢印の動きと表示 -->
        <span class="arrow" :class="{ open: activeIndex === index }">&#9660;</span>
      </div>
      <!-- アコーディオン式で答えを表示 -->
      <div class="faq-answer" v-show="activeIndex === index">
        <!-- 改行を安全に処理 -->
        <p v-html="formatAnswer(item.answer)"></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-container {
  padding: 20px;
  max-width: auto;
  margin: 0 auto;
  background-color: #f4f4f4;
}

.faq-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.faq-item {
  padding: 20px 100px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
}

.faq-question:hover {
  background-color: #ff8c00;
}

.arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(180deg); /* 矢印を180度回転させる */
}

.faq-answer {
  padding: 10px;
  background-color: #ffca5f;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
