<script setup>
import apiClient from '@/axios'; // axios設定をインポート
import { reactive, ref, onMounted, watch } from 'vue'; // Vueのreactiveとrefをインポート
import MapURL from './components/mapURL.vue'; // MapURLコンポーネントをインポート

// 初期状態の依頼データを格納するreactiveオブジェクト
const request = reactive({
  requestPoints: '', // 出資ポイント
  basicInfo: '', // 基本情報（フリー入力欄）
  requestName: '', // 依頼名
  requestCondition: '', // 依頼達成条件
  minPeople: 1, // 下限人数
  maxPeople: 20, // 上限人数
  activityDate: '', // 活動日
  startTime: 1, // 開始時刻（デフォルト0時）
  endTime: 24, // 終了時刻（デフォルト23時）
  prefecture: '', // 都道府県ID（pref_id）
  address1: '', // 住所1
  address2: '', // 住所2
  participation: '', //依頼者参加
  equipmentNeeded: '無', // 必要備品
  caseId: null, // 投稿後にセットされる依頼ID
  googleMap: '', 
});
// Google Map URLを管理
const mapUrl = ref(
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3336.9402313198366!2d131.59498278885496!3d33.2418692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3546a1b56e090a53%3A0xf6ea0ca5831fdae!2zSVZZ5aSn5YiG6auY5bqm44Kz44Oz44OU44Ol44O844K_5bCC6ZaA5a2m5qCh!5e0!3m2!1sja!2sjp!4v1732509380190!5m2!1sja!2sjp'
);
// `mapUrl` の変更を監視して `request.googleMap` を更新
watch(mapUrl, (newValue) => {
  request.googleMap = newValue;
});
// アップロードされた写真を格納
const uploadedPhotos = reactive({});

// 写真アップロード設定
const photoUploaders = ref([
  { pictureType: 1, label: "基本情報の写真" },
  { pictureType: 2, label: "依頼詳細の写真" },
]);


// 都道府県リストを格納するref変数
const prefectures = ref([]);
const activityAreas = ref([]); // 活動エリアのデータ
const selectedAreas = ref([]); // 選択された活動エリア
const activityThemes = ref([]);  // 活動テーマデータを格納
const selectedThemes = ref([]);  // 選択されたテーマIDを格納
const recommendedAges = ref([]); // 推奨年齢データを格納
const selectedAges = ref([]); // 選択された推奨年齢IDを格納
const features = ref([]); // 特徴データを格納する変数
const selectedFeatures = ref([]); // 選択された特徴IDを格納
// const mapUrl = ref(); // Map URLの値を管理するref

// 写真アップロード更新処理
const handlePhotosUpdated = ({ pictureType, file }) => {
  uploadedPhotos[`photo${pictureType}`] = file;
  // アップロードされたファイルの詳細をログに出力
  console.log(`アップローダータイプ: ${pictureType}`);
  console.log(`アップロードされたファイル:`, file);
};

// フィードバックメッセージを格納するref変数
const message = ref('');

//ログイン情報を取得
const fetchUserData = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    message.value = 'ログイン情報が見つかりません。再度ログインしてください。';
    return;
  }

  try {
    // トークンを使用してユーザー情報を取得
    const response = await apiClient.get('/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    });


    // ユーザー情報をrequestオブジェクトにセットする
    request.user_id = response.data.id;


  } catch (error) {
    console.error('ユーザーデータの取得に失敗しました:', error);
    message.value = 'ユーザーデータの取得に失敗しました。再度ログインしてください。';
  }
};


// 都道府県データを取得する非同期関数
const fetchPrefectures = async () => {
  try {
    const response = await apiClient.get('/prefectures'); // APIを使って都道府県リストを取得
    prefectures.value = response.data; // 取得した都道府県データを格納
  } catch (error) {
    console.error('都道府県データの取得に失敗しました:', error);
    message.value = '都道府県データの取得に失敗しました。';
  }
};

// 活動エリアを取得する関数
const fetchActivityAreas = async () => {
  try {
    const response = await apiClient.get('/places'); // APIからデータを取得
    activityAreas.value = response.data; // 取得したデータを格納
  } catch (error) {
    console.error('活動エリアデータの取得に失敗しました:', error);
    message.value = '活動エリアデータの取得に失敗しました。';
  }
};

// 活動テーマデータを取得
const fetchActivityThemes = async () => {
  try {
    const response = await apiClient.get('/activity-themes'); // APIで活動テーマを取得
    activityThemes.value = response.data; // 取得したテーマデータを格納
  } catch (error) {
    console.error('活動テーマの取得に失敗しました:', error);
  }
};

// 推奨年齢データを取得
const fetchRecommendedAges = async () => {
  try {
    const response = await apiClient.get("/recommended-ages"); // APIで推奨年齢データを取得
    recommendedAges.value = response.data; // 取得した推奨年齢データを格納
  } catch (error) {
    console.error("推奨年齢データの取得に失敗しました:", error);
  }
};

// 特徴データを取得する関数
const fetchFeatures = async () => {
  try {
    const response = await apiClient.get('/features'); // APIで特徴データを取得
    features.value = response.data; // 取得した特徴データを格納
  } catch (error) {
    console.error('特徴データの取得に失敗しました:', error);
  }
};

//Google Map URLを追加
// const props = defineProps({
//   url: String,
// });



const submitRequest = async () => {
  try {
    // 必須フィールドのバリデーション
    if (!request.requestName || !request.requestCondition || !request.activityDate) {
      message.value = "依頼名、依頼達成条件、活動日は必須です";
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      message.value = "ログイン情報が見つかりません。再度ログインしてください。";
      return;
    }

    // ユーザー情報の取得
    const userResponse = await apiClient.get('/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userId = userResponse.data.user_id;

    // IDを整形
    const sortedAreas = [...selectedAreas.value].sort((a, b) => Number(a) - Number(b));
    const formattedAreas = sortedAreas.join(',');
    const formattedThemes = selectedThemes.value.join(',');
    const formattedAges = [...selectedAges.value].sort((a, b) => Number(a) - Number(b)).join(',');
    const formattedFeatures = [...selectedFeatures.value].sort((a, b) => Number(a) - Number(b)).join(',');

    // `FormData` を作成
    const formData = new FormData();
    formData.append("sup_point", request.requestPoints);
    formData.append("client_id", userId);
    formData.append("case_name", request.requestName);
    formData.append("achieve", request.requestCondition);
    formData.append("area_detail", request.areaDetails || "");
    formData.append("lower_limit", request.minPeople);
    formData.append("upper_limit", request.maxPeople);
    formData.append("exec_date", request.activityDate);
    formData.append("start_activty", request.startTime);
    formData.append("end_activty", request.endTime);
    formData.append("address1", request.address1);
    formData.append("address2", request.address2 || "");
    formData.append("pref_id", request.prefecture);
    formData.append("participation_id", request.participation ? 1 : 0);
    formData.append("equipment", request.equipmentNeeded);
    formData.append("area_id", formattedAreas);
    formData.append("theme_id", formattedThemes);
    formData.append("rec_age_id", formattedAges);
    formData.append("feature_id", formattedFeatures);
    formData.append("content", request.basicInfo);
    formData.append("contents", request.requestDetails || "");
    formData.append("state_id", 1); // 仮の進捗状況ID
    request.googleMap = mapUrl.value;
    formData.append("google_map", request.googleMap || ""); // Map URLを追加    // デバッグ: mapUrl の型と値を確認
    console.log("mapUrl の値:", mapUrl);

    // 写真データを追加
    if (uploadedPhotos.photo1) formData.append('photo1', uploadedPhotos.photo1);
    if (uploadedPhotos.photo2) formData.append('photo2', uploadedPhotos.photo2);

    // デバッグ: 送信データを確認
    console.log("送信するFormData:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    // APIリクエスト
    const response = await apiClient.post('/request', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // 成功時の処理
    message.value = "依頼が投稿されました！";
    console.log("送信成功:", response.data);
    console.log("送信するFormData:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

  } catch (error) {
    console.error("送信エラー:", error.response?.data || error);

    // エラーメッセージを設定
    if (error.response?.data?.message) {
      message.value = `送信失敗: ${error.response.data.message}`;
    } else {
      message.value = "送信に失敗しました。";
    }
  }
};


// コンポーネントがマウントされたときの処理
onMounted(() => {
  fetchUserData();
  fetchPrefectures(); // 都道府県リストを取得
  fetchActivityAreas();
  fetchActivityThemes();
  fetchRecommendedAges();
  fetchFeatures();
});

</script>

<template>
  <div class="toko-page">
    <h1 class="page-title">依頼を投稿する</h1>

    <!-- フォーム -->
    <form @submit.prevent="submitRequest">
      <!-- 依頼ポイント -->
      <div class="form-group">
        <label for="request-points">依頼ポイント</label>
        <input id="request-points" v-model="request.requestPoints" placeholder="100" required />ポイント
      </div>

      <!-- 依頼名 -->
      <div class="form-group">
        <label for="request-name">依頼名</label>
        <input type="text" id="request-name" v-model="request.requestName" placeholder="依頼の名前を入力してください" required />
      </div>

      <!-- 募集人数 -->
      <div class="form-group">
        <label for="min-people">募集人数</label>
        <div class="flex">
          <select id="min-people" v-model="request.minPeople">
            <option v-for="num in 20" :key="'min-' + num" :value="num">{{ num }}</option>
          </select>
          ～
          <select id="max-people" v-model="request.maxPeople">
            <option v-for="num in 20" :key="'max-' + num" :value="num">{{ num }}</option>
          </select>
          人
        </div>
      </div>

      <!-- 活動日 -->
      <div class="form-group">
        <label for="activity-date">活動日</label>
        <input type="date" id="activity-date" v-model="request.activityDate" required />
      </div>

      <!-- 活動時間 -->
      <div class="form-group">
        <label for="activity-time">活動時間</label>
        <div class="flex">
          <select id="start-time" v-model="request.startTime">
            <option v-for="hour in 24" :key="'start-' + hour" :value="hour">{{ hour }}時</option>
          </select>
          ～
          <select id="end-time" v-model="request.endTime">
            <option v-for="hour in 24" :key="'end-' + hour" :value="hour">{{ hour }}時</option>
          </select>
        </div>
      </div>

      <!-- 活動場所 -->
      <div class="form-group">
        <label for="activity-location">活動場所</label>
        <div class="flex">
          <!-- 都道府県 -->
          <div class="form-group-todo">
            <label for="prefecture"></label>
            <select id="prefecture" v-model="request.prefecture" required>
              <option value="" disabled>都道府県</option>
              <option v-for="pref in prefectures" :key="pref.pref_id" :value="pref.pref_id">
                {{ pref.pref }}
              </option>
            </select>
          </div>

          <!-- 住所1 -->
          <input type="text" id="address1" v-model="request.address1" placeholder="市町村" required />

          <!-- 住所2 -->
          <input type="text" id="address2" v-model="request.address2" placeholder="住所2" />
        </div>
      </div>

      <!-- 依頼者参加 -->
      <div class="form-group">
        <label class="inline-label">依頼者が当日参加する</label>
        <div>
          <label class="checkbox-label">
            <input type="checkbox" v-model="request.participation" />当日参加します。
          </label>
        </div>
      </div>

      <!-- 必要備品 -->
      <div class="form-group">
        <label class="inline-label">必要備品</label>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" value="有" v-model="request.equipmentNeeded" />有
          </label>
          <label class="radio-label">
            <input type="radio" value="無" v-model="request.equipmentNeeded" />無
          </label>
        </div>
      </div>

      <!-- 活動エリア -->
      <div class="form-group">
        <label>活動エリア</label>
        <div class="checkbox-group">
          <label class="checkbox-label" v-for="area in activityAreas" :key="area.area_id">
            <input type="checkbox" :value="area.area_id" v-model="selectedAreas" /> {{ area.area }}
          </label>
        </div>
      </div>

      <!-- 活動テーマ -->
      <div class="form-group">
        <label>活動テーマ</label><br>
        <div class="checkbox-group">
          <label v-for="theme in activityThemes" :key="theme.theme_id" class="checkbox-label">
            <input type="checkbox" :value="theme.theme_id" v-model="selectedThemes" />
            {{ theme.theme }}
          </label>
        </div>
      </div>

      <!-- 推奨年齢 -->
      <div class="form-group">
        <label>推奨年齢</label>
        <div class="checkbox-group">
          <label v-for="age in recommendedAges" :key="age.rec_age_id" class="checkbox-label">
            <input type="checkbox" :value="age.rec_age_id" v-model="selectedAges" />
            {{ age.rec_age }}
          </label>
        </div>
      </div>

      <!-- 特徴 -->
      <div class="form-group">
        <label>特徴</label>
        <div class="checkbox-group">
          <label v-for="feature in features" :key="feature.feature_id" class="checkbox-label">
            <input type="checkbox" :value="feature.feature_id" v-model="selectedFeatures" />
            {{ feature.feature }}
          </label>
        </div>
      </div>

      <!-- 依頼達成条件 -->
      <div class="form-group">
        <label for="request-condition">依頼達成条件</label>
        <textarea id="request-condition" v-model="request.requestCondition" placeholder="依頼を達成するための条件を記入してください"
          rows="4"></textarea>
      </div>

      <!-- エリア詳細（フリー入力） -->
      <div class="form-group">
        <label for="area-details">エリア詳細</label>
        <textarea id="area-details" v-model="request.areaDetails" placeholder="エリアに関する詳細情報を記入してください"
          rows="4"></textarea>
      </div>

      <!-- 基本情報（フリー入力） -->
      <div class="form-group">
        <label for="basic-info">基本情報</label>
        <textarea id="basic-info" v-model="request.basicInfo" placeholder="依頼の背景や基本情報を記入してください（例：活動目的や概要など）" rows="6"
          required></textarea>
      </div>

      <!-- 写真アップロード1 -->
      <PhotoUploaderGroup :uploaders="[photoUploaders[0]]" @photosUpdated="handlePhotosUpdated" />
      <!-- 依頼詳細（フリー入力） -->
      <div class="form-group">
        <label for="request-details">依頼詳細</label>
        <textarea id="request-details" v-model="request.requestDetails" placeholder="依頼内容の詳細を記入してください"
          rows="4"></textarea>
      </div>

      <!-- 写真アップロード2 -->
      <PhotoUploaderGroup :uploaders="[photoUploaders[1]]" @photosUpdated="handlePhotosUpdated" />

      <!-- MapURLコンポーネントを使用 -->
      <MapURL v-model="request.googleMap" />


      <!-- 送信ボタン -->
      <button type="submit" class="btn1">投稿する</button>
    </form>
  </div>
</template>

<style scoped>
.toko-page {
  background-color: #f4f4f4;
  max-width: auto;
  margin: 0 auto;
  padding: 20px;
  font-family: "Zen Maru Gothic", serif;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;

  .flex1 {
    width: 200px;
    display: flex;
  }
}

#request-points {
  width: 50px;
}

#area-details {
  width: 838px;
}

#basic-info {
  width: 838px;
}

#request-details {
  width: 838px;
}


label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

textarea,
input,
select {
  font-family: "Zen Maru Gothic", serif;
  padding: 10px;
  font-size: 16px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.radio-group,
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.radio-label,
.checkbox-label {
  font-size: 14px;
  display: flex;
  width: 100px;
  align-items: center;

}

.btn1 {
  margin-top: 20px;
  width: 200px;
}
</style>