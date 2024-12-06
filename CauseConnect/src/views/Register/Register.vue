<script setup>
// Vueの`reactive`, `ref`, `onMounted`をインポート
import { reactive, ref, onMounted } from 'vue'
// axiosインスタンスをインポート
// import apiClient from './axios'
import apiClient from '@/axios'; // axios設定をインポート
import { useRouter } from 'vue-router';  // vue-routerをインポート
const router = useRouter();
// 画像アップローダーコンポーネントをインポート（画像アップロードのため）
// import PhotoUploader from '@/PhotoUploader.vue'

// 初期状態のユーザーデータを格納する`reactive`なオブジェクト
const user = reactive({
  password: '', // パスワード
  nickname: '', // ニックネーム
  name: '', // 名前
  kana: '', // カナ
  birth: '', // 生年月日
  sex: '', // 性別
  tel: '', // 電話番号
  email: '', // メールアドレス
  address1: '', // 住所1（市町村）
  address2: '', // 住所2（番地や建物名）
  post_code: '', // 郵便番号
  prefecture: '', // 都道府県ID
  intro: '', // 自己紹介
})

// 都道府県リストを格納する`ref`変数
const prefectures = ref([])

// フィードバックメッセージを格納する`ref`変数
const message = ref('')

// ユーザー情報をリセットする関数
const resetUser = () => {
  // `Object.assign`を使って、ユーザーデータを初期状態にリセット
  Object.assign(user, {
    password: '1111', // パスワード
    nickname: 'テスト用ニックネーム', // ニックネーム
    name: 'テスト用名前', // 名前
    kana: 'テスト用カナ', // カナ
    birth: '', // 生年月日
    sex: '', // 性別
    tel: '09012345678', // 電話番号
    email: 'test@ivy.co.jp', // メールアドレス
    address1: 'テスト用住所１', // 住所1（市町村）
    address2: 'テスト用住所２', // 住所2（番地や建物名）
    post_code: '1234567', // 郵便番号
    prefecture: '', // 都道府県ID
    intro: 'テスト用自己紹介', // 自己紹介
  })
}

// 都道府県データを取得する非同期関数
const fetchPrefectures = async () => {
  try {
    // APIを使って都道府県リストを取得
    const response = await apiClient.get('/prefectures')
    prefectures.value = response.data // 取得した都道府県データを`prefectures`に格納
  } catch (error) {
    // エラーが発生した場合
    console.error('都道府県データの取得に失敗しました:', error)
    message.value = '都道府県データの取得に失敗しました。' // ユーザー向けメッセージ
  }
}

// フォーム送信処理の非同期関数
const submitForm = async () => {
  // 送信時にユーザーデータをコンソールに表示（デバッグ用）
  console.log('送信時のユーザーデータ:', JSON.parse(JSON.stringify(user)))

  try {
    // 送信するデータ（ユーザーの情報を`payload`にまとめる）
    const payload = {
      password: user.password,
      nickname: user.nickname,
      name: user.name,
      kana: user.kana,
      birth: user.birth,
      sex: user.sex,
      tel: user.tel,
      email: user.email,
      address1: user.address1,
      address2: user.address2,
      post_code: user.post_code,
      pref_id: user.prefecture,
      intro: user.intro,
    }

    // `POST`リクエストを使ってデータを送信
    const response = await apiClient.post('/users', payload)

    // 送信が成功した場合、メッセージを設定
    message.value = response.data.message || '登録が成功しました！'
    resetUser(); // フォームリセット

    // ホームページへ遷移
    router.push({ name: "Home" });

    // 送信成功後に Home ページに遷移
  } catch (error) {
    // 送信中にエラーが発生した場合
    console.error('登録処理中にエラーが発生しました:', error)
    message.value = '登録に失敗しました。入力内容を確認してください。' // エラーメッセージを設定
  }
}

// コンポーネントがマウントされた際に呼ばれる処理
onMounted(() => {
  resetUser() // ユーザーデータの初期化
  fetchPrefectures() // 都道府県リストを取得
})
</script>

<template>
  <!-- 写真アップロードコンポーネント -->
  <!-- <PhotoUploader /> -->

  <div class="mypage-container">
    <h1>新規登録</h1>
    <form @submit.prevent="submitForm" autocomplete="off">
      <div class="left-container">
        <!-- メールアドレス -->
        <div class="form-group">
          <label for="email">メールアドレス</label>
          <input type="email" id="email" v-model="user.email" placeholder="メールアドレスを入力してください" required />
        </div>

        <!-- パスワード -->
        <div class="form-group">
          <label for="password">パスワード</label>
          <input type="password" id="password" v-model="user.password" placeholder="パスワードを入力" required />
        </div>

        <!-- 確認用パスワード -->
        <div class="form-group">
          <label for="confirm-password">パスワード確認</label>
          <input type="password" id="confirm-password" v-model="user.confirmPassword" placeholder="確認用パスワードを入力"
            required />
        </div>

        <!-- ニックネーム -->
        <div class="form-group">
          <label for="nickname">ニックネーム</label>
          <input type="text" id="nickname" v-model="user.nickname" placeholder="ニックネームを入力" required />
        </div>

        <!-- 名前 -->
        <div class="form-group">
          <label for="name">名前</label>
          <input type="text" id="name" v-model="user.name" placeholder="名前を入力してください" required />
        </div>

        <!-- カナ -->
        <div class="form-group">
          <label for="kana">カナ</label>
          <input type="text" id="kana" v-model="user.kana" placeholder="カナを入力してください" required />
        </div>

        <!-- 生年月日 -->
        <div class="form-group-b">
          <label for="birth">生年月日</label>
          <input type="date" id="birth" v-model="user.birth" required />
        </div>

        <!-- 性別 -->
        <div class="form-group-sex">
          <label for="sex">性別</label>
          <select id="sex" v-model="user.sex" required>
            <option value="" disabled>性別を選択</option>
            <option value="男性">男性</option>
            <option value="女性">女性</option>
            <option value="その他">その他</option>
          </select>
        </div>
      </div>

      <div class="right-container">

        <!-- 電話番号 -->
        <div class="form-group">
          <label for="tel">電話番号</label>
          <input type="tel" id="tel" v-model="user.tel" placeholder="電話番号を入力してください" required />
        </div>

        <!-- 住所 -->
        <div class="form-group-todo">
          <label for="prefecture">都道府県</label>
          <select id="prefecture" v-model="user.prefecture" required>
            <option value="" disabled>都道府県を選択</option>
            <option v-for="pref in prefectures" :key="pref.pref_id" :value="pref.pref_id">
              {{ pref.pref }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="post-code">郵便番号</label>
          <input type="text" id="post-code" v-model="user.post_code" placeholder="郵便番号を入力してください" required />
        </div>

        <div class="form-group">
          <label for="address1">住所1（市町村）</label>
          <input type="text" id="address1" v-model="user.address1" placeholder="市町村を入力してください" required />
        </div>

        <div class="form-group">
          <label for="address2">住所2（番地・建物名）</label>
          <input type="text" id="address2" v-model="user.address2" placeholder="番地や建物名を入力してください" />
        </div>

        <!-- 自己紹介 -->
        <div class="form-group">
          <label for="intro">自己紹介</label>
          <textarea id="intro" v-model="user.intro" placeholder="自己紹介を記入してください" rows="5"></textarea>
        </div>
      </div>

      <!-- 送信ボタン -->
      <button class="btn1"  type="submit">登録する</button>
    </form>

    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<style scoped>
.mypage-container {
  font-family: 'Zen Maru Gothic', serif;
  max-width: auto;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
}

.left-container,
.right-container {
  width: 49%; /* 横幅を50%以下にして間隔を確保 */
  box-sizing: border-box; /* パディングやボーダーを含めた幅の計算 */
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group-b {
width: 60%;
  margin-bottom: 15px;
}

.form-group-sex {
width: 60%;
  margin-bottom: 15px;
}

.form-group-todo {
width: 100%;
  margin-bottom: 15px;
}


label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select,
textarea {
  font-family: 'Zen Maru Gothic', serif;
  width: 30%;
  padding: 8px;
  border: 1px solid #f7a400;
  border-radius: 4px;
}


.message {
  margin-top: 15px;
  color: green;
  text-align: center;
}
</style>
