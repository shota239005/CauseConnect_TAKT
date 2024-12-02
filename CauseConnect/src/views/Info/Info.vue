<script setup>
// RegisterButtonコンポーネントをインポート
import RegisterButton from '@/components/RegisterButton.vue'
</script>

<template>
    <div class="info-page">

      <!-- 説明文1 -->
      <div class="info-section">
        <div class="content">
          <h1>当サイトについて</h1>
          <p>
            当サイトは、あなたのために様々なサービスを提供しています。<br>
            簡単に情報を得られるよう、直感的に使えるインターフェースを心掛けています。<br>
            地域や自然環境の保護に貢献したいと考える人々が抱える、従来のボランティア活動における課題を解決し、<br>
            気軽に参加できる社会貢献活動の機会を提供することを目的としています。
          </p>
        </div>
      </div>
      <!-- 新規登録ボタン -->
      <RegisterButton />


      <!-- 説明文2 -->
      <section class="info-section">
        <div class="content">
            <h1>「参加する時間がない」への対応</h1>
            出資者としての参加方式を設け、現地に赴く時間がない人でも、活動のサポートを資金面で行える仕組みを提供します。これにより、時間的制約を持つ人々にも社会貢献の機会が広がります。<br>
            <h1>「ボランティア活動に関する十分な情報がない」への対応</h1>
            依頼内容、進行状況、参加条件が一目で分かるシンプルなシステム設計を採用し、利用者が活動内容や参加方法について迷わないように工夫します。また、依頼検索や通知機能により、参加者にとって関連情報を容易に見つけられる環境を整備します。<br>
            <h1>「参加する際の経費（交通費等）の負担」への対応</h1>
            実行者への報酬制度を導入し、活動時にかかる交通費などの負担を軽減します。報酬の提供により、参加の継続性を確保し、多くの人が無理なく社会貢献活動に参加できる環境を目指します。<br>
            本プラットフォームはこのように、誰もが自分のペースで参加できる社会貢献活動の形を提供することで、地域社会と環境保護への新しい関わり方を促進し、持続可能な活動基盤の形成を目指します。<br>
            <h2>新規登録を行うことで、さらに多くの機能にアクセスできるようになります。あなたに最適な情報を提供するため、是非ご登録ください。</h2>
        </div>

      </section>
      <!-- 新規登録ボタン -->
      <RegisterButton />

    </div>

  </template>


  <style scoped>

.info-section[data-v-1f5d130e] {
  margin-bottom: 0px; /* 余白を削除 */
}

.info-section {
  background-color: #f4f4f4;
  /*background: url('../../../Design/infoG_O.jpg') no-repeat center center / cover; */
  padding: 10px; /* コンテンツと背景画像の間に余白を設定 */
  margin-bottom: 0px;
}

.content {
  font-family: "Zen Maru Gothic", serif;
  position: relative;
  z-index: 1; /* 背景より前面に表示 */
  color: #333;/* テキストを読みやすくするために色を変更 */
  text-shadow: 1px 1px 2px rgb(255, 255, 255); /* フォントに影をつける */
  text-align: center;
  padding: 20px;
}
.btn1{
  font-size: large;
  font-weight: 1000;
}
.info-page {
  font-family: Arial, sans-serif;
  padding: 2px;
}

.info-section {
  margin-bottom: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
}
</style>
