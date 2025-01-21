<script setup>
import { ref } from 'vue';
import DOMPurify from 'dompurify';
import Picture from '@/components/Picture.vue'; // Picture.vue をインポート（ファイル名修正に注意）

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

// モーダルの開閉状態を管理
const isModalOpen = ref(false);

// モーダルを開く関数
function openModal() {
  isModalOpen.value = true;
}

// モーダルを閉じる関数
function closeModal() {
  isModalOpen.value = false;
}

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

    <!-- モーダル -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <button @click="closeModal" class="modal-close">×</button>
        <Picture /> <!-- モーダル内で Picture.vue を表示 -->
      </div>
    </div>

    <!-- お問い合わせリンク -->
    <div class="contact-section">
      <p>上記以外のお問い合わせは下記のフォームから</p>
      <a href="https://www.kurakon.jp/" class="contact-link">お問い合わせフォームへ</a>
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
  transform: rotate(180deg);
}

.faq-answer {
  padding: 10px;
  background-color: #ffca5f;
  border-radius: 5px;
  margin-top: 10px;
}

.test-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff8c00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.test-button:hover {
  background-color: #ffca5f;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
}

.modal-close:hover {
  background: darkred;
}

.contact-section {
  text-align: center;
  margin-top: 20px;
}

.contact-link {
  color: #ff8c00;
  font-weight: bold;
  text-decoration: none;
}

.contact-link:hover {
  text-decoration: underline;
}
</style>
