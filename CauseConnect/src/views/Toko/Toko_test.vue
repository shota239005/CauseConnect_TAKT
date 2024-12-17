<script setup>
import apiClient from '@/axios'; // axios設定をインポート
import { reactive, ref, onMounted } from 'vue'; // Vueのreactiveとrefをインポート
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
});

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

    const userId = response.data.id;  // ユーザーIDを取得
    // 必要であれば、その他のユーザー情報も取得

    // ユーザー情報をrequestオブジェクトにセットする
    request.user_id = userId;  // ユーザーIDをrequestに設定

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


const submitRequest = async () => {
  try {
    // 必須フィールドのバリデーション
    if (!request.requestName || !request.requestCondition || !request.activityDate) {
      message.value = "依頼名、依頼達成条件、活動日は必須です";
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      message.value = 'ログイン情報が見つかりません。再度ログインしてください。';
      return;
    }

    // トークンを使ってユーザー情報を取得
    const userResponse = await apiClient.get('/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userId = userResponse.data.user_id;  // ユーザーIDを取得

    // エリアIDを昇順に並び替え
    const sortedAreas = [...selectedAreas.value].sort((a, b) => Number(a) - Number(b));

    // 推奨年齢IDを昇順に並び替え
    const sortedAges = [...selectedAges.value].sort((a, b) => Number(a) - Number(b));

    // 特徴IDを昇順に並び替え
    const sortedFeatures = [...selectedFeatures.value].sort((a, b) => Number(a) - Number(b));

    const formattedAreas = sortedAreas.join(','); // 活動テーマID（カンマ区切りの文字列）
    const formattedThemes = selectedThemes.value.join(','); // 活動エリアID（カンマ区切りの文字列）
    const formattedAges = sortedAges.join(','); // 推奨年齢ID（カンマ区切りの文字列）
    const formattedFeatures = sortedFeatures.join(','); // 特徴ID（カンマ区切りの文字列）

    // 送信するデータをまとめる（リアクティブ性を除去）
    const payload = {
      sup_point: request.requestPoints,
      client_id: userId,  // トークンで取得したユーザーIDを使用
      case_name: request.requestName,  // 依頼名
      achieve: request.requestCondition, // 依頼達成条件
      aria_detail: request.areaDetails, //エリア詳細
      lower_limit: request.minPeople, // 下限人数
      upper_limit: request.maxPeople, // 上限人数
      exec_date: request.activityDate, // 活動日
      start_activty: request.startTime, // 活動開始時間
      end_activty: request.endTime, // 活動終了時間
      address1: request.address1, // 住所１
      address2: request.address2, // 住所２
      pref_id: request.prefecture, // 都道府県ID
      participation_id: request.participation ? 1 : 0, // true/false を 1/0 に変換
      equipment: request.equipmentNeeded, // 必要備品
      area_id: formattedAreas, // 活動エリアID
      theme_id: formattedThemes, // 活動テーマID
      rec_age_id: formattedAges, // 推奨年齢ID
      feature_id: formattedFeatures, // 特徴ID（カンマ区切り）
      content: request.basicInfo, // 内容(基本情報)
      contents: request.requestDetails, // 内容(依頼詳細)
      state_id: 1, // 仮の進捗状況ID
    };

    // デバッグ用ログ
    console.log('送信時のペイロード:', payload);
    console.log('token:', token);

    // APIリクエスト
    const response = await apiClient.post('/request', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 成功メッセージ
    message.value = '依頼が投稿されました！';
    console.log('レスポンス:', response.data);
  } catch (error) {
    console.error('送信エラー:', error);

    // エラー処理
    if (error.response) {
      console.error('サーバーレスポンス:', error.response);
      message.value = error.response.data?.message || '送信に失敗しました。';
    } else if (error.request) {
      console.error('リクエストエラー:', error.request);
      message.value = 'サーバーから応答がありません。';
    } else {
      console.error('その他のエラー:', error.message);
      message.value = '送信中にエラーが発生しました。';
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
      <div class="form-group">
        <label for="photo-upload-1">写真をアップロード1</label>
        <input type="file" id="photo-upload-1" @change="handleFileUpload1" accept="image/*" />
      </div>

      <!-- 依頼詳細（フリー入力） -->
      <div class="form-group">
        <label for="request-details">依頼詳細</label>
        <textarea id="request-details" v-model="request.requestDetails" placeholder="依頼内容の詳細を記入してください"
          rows="4"></textarea>
      </div>

      <!-- 写真アップロード2 -->
      <div class="form-group">
        <label for="photo-upload-2">写真をアップロード2</label>
        <input type="file" id="photo-upload-2" @change="handleFileUpload2" accept="image/*" />
      </div>

      <MapURL />

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
