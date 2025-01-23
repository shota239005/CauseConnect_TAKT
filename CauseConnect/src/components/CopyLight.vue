<script>
</script>
<template>
  <div class="footer">
    <div class="sns-icons">
      <a href="https://x.com" target="_blank" class="sns-icon"><i class="fab fa-x-twitter"></i></a>
      <a href="https://instagram.com" target="_blank" class="sns-icon"><i class="fab fa-instagram"></i></a>
      <a href="https://facebook.com" target="_blank" class="sns-icon"><i class="fab fa-facebook"></i></a>
      <a href="https://mixi.jp" target="_blank" class="sns-icon"><i class="fas fa-user-friends"></i></a> <!-- mixi用のアイコン -->
    </div>
    <div class="footer-links">
      <span>会社概要</span> |
      <span>利用規約</span> |
      <span>プライバシーポリシー</span> |
      <span>お問い合わせ</span> |
      <span>よくある質問</span> |
      <span>サイトマップ</span>
    </div>
  <div class="light">
    © 2024-2025 CauseConnect Inc.
  </div>
</div>
</template>

<style>

.footer{
  margin-top: 20px;
  background-color:#333;
  color: #f7a400;
  text-align: center;
}

.sns-icons {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.sns-icon {
  font-size: 24px;
  color: white;
  text-decoration: none;
  transition: transform 0.2s;
}

.sns-icon:hover {
  transform: scale(1.2);
  color: #ffcc00;
}

/* スマホ向け（600px以下） */
@media screen and (max-width: 600px) {
  body {
    font-size: 12px;
    background-color: #fff;
  }

  #app {
    max-width: 100%; /* スマホでは幅いっぱいにする */
  }

  .faq-item {
    padding: 15px 20px; /* 左右の余白を狭くする */
  }

  .faq-title {
    font-size: 1.5rem; /* タイトルを少し小さめに */
  }

  .modal-content {
    width: 95%; /* 画面幅に合わせる */
    padding: 15px; /* 余白を少し減らす */
  }
}

</style>
