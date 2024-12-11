<script setup>
import axios from '@/axios'; // axios設定をインポート
import MapURL from './components/mapURL.vue'; // MapURLコンポーネントをインポート
</script>

<script>
export default {
  data() {
    return {
      requestPoints: '', // 出資ポイント
      basicInfo: '', // 基本情報（フリー入力欄）
      requestName: '', // 依頼名
      requestCondition: '', // 依頼達成条件
      minPeople: 1, // 下限人数
      maxPeople: 20, // 上限人数
      activityDate: '', // 活動日
      startTime: '0', // 開始時刻（デフォルト0時）
      endTime: '23', // 終了時刻（デフォルト23時）
      prefecture: '', // 都道府県ID（pref_id）
      address1: '', // 住所1
      address2: '', // 住所2
      Participation: '無', // 参加

      equipmentNeeded: '無', // 必要備品
      activityAreas: {
        road: false,
        mountain: false,
        river: false,
        sea: false,
        park: false,
        other: false,
      }, // 活動エリア
      activityTheme: {
        regionalBeautification: false,
      }, // 活動テーマ
      recommendedAge: {
        all: false,
        senior: false,
        adult: false,
        student: false,
        other: false,
      }, // 推奨年齢
      features: {
        familyFriendly: false,
        beginnerFriendly: false,
        physical: false,
      }, // 特徴
      areaDetails: '', // エリア詳細
      requestDetails: '', // 依頼詳細
    };
  },
  methods: {
    async handleFileUpload1(event) {
      const file = event.target.files[0];
      if (file) {
        console.log('アップロードした写真1:', file);
      }
    },
    async handleFileUpload2(event) {
      const file = event.target.files[0];
      if (file) {
        console.log('アップロードした写真2:', file);
      }
    },
    async submitRequest() {
      try {
        // 必須フィールドのバリデーション
        if (!this.requestName || !this.requestCondition || !this.activityDate) {
          alert("依頼名、依頼達成条件、活動日は必須です");
          return;
        }

        // 入力データをまとめる
        const payload = {
          client_id: localStorage.getItem('user_id'), // 依頼者ID（ログインユーザーID）
          case_name: this.requestName,
          achieve: this.requestCondition,
          lower_limit: this.minPeople,
          upper_limit: this.maxPeople,
          case_date: this.activityDate,
          start_activty: this.startTime,
          end_activty: this.endTime,
          address_id: this.getAddressId(), // 正しい住所IDを送信
          equipment: this.equipmentNeeded,
          area_id: this.getActivityAreaId(), // 活動エリアID
          theme_id: this.getActivityThemeId(), // 活動テーマID
          rec_age_id: this.getRecommendedAgeId(), // 推奨年齢ID
          feature_id: this.getFeatureId(), // 特徴ID
          area_detail: this.areaDetails,
          content: this.basicInfo,
          contents: this.requestDetails,
          state_id: 1, // 仮に初期進捗状況ID（例: 進行中）
        };

        // サーバーにPOSTリクエストを送信
        const response = await axios.post('/api/request', payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // トークンを送信
          },
        });

        // 成功時のメッセージ
        alert('依頼が投稿されました！');
        console.log('レスポンス:', response.data);
      } catch (error) {
        console.error('送信エラー:', error);
        if (error.response && error.response.data) {
          alert(`エラー: ${error.response.data.message || '送信に失敗しました'}`);
        } else {
          alert('ネットワークエラーまたはサーバーエラーが発生しました');
        }
      }
    },
    // 住所IDを取得（例: 都道府県IDに基づいて住所IDを決定）
    getAddressId() {
      // 仮の住所IDマッピング。実際には住所IDを取得する方法を追加する必要があります
      return this.prefecture || null;
    },
    getActivityAreaId() {
      const selectedArea = Object.keys(this.activityAreas).find(
        (key) => this.activityAreas[key]
      );
      const areaMap = {
        road: 1,
        mountain: 2,
        river: 3,
        sea: 4,
        park: 5,
        other: 6,
      };
      return areaMap[selectedArea] || null;
    },
    getActivityThemeId() {
      const selectedTheme = Object.keys(this.activityTheme).find(
        (key) => this.activityTheme[key]
      );
      const themeMap = {
        regionalBeautification: 1,
      };
      return themeMap[selectedTheme] || null;
    },
    getRecommendedAgeId() {
      const selectedAge = Object.keys(this.recommendedAge).find(
        (key) => this.recommendedAge[key]
      );
      const ageMap = {
        all: 1,
        senior: 2,
        adult: 3,
        student: 4,
        other: 5,
      };
      return ageMap[selectedAge] || null;
    },
    getFeatureId() {
      const selectedFeature = Object.keys(this.features).find(
        (key) => this.features[key]
      );
      const featureMap = {
        familyFriendly: 1,
        beginnerFriendly: 2,
        physical: 3,
      };
      return featureMap[selectedFeature] || null;
    },
  },
};
</script>


 
 
<template>
  <div class="toko-page">
    <h1 class="page-title">依頼を投稿する</h1>
 
    <!-- フォーム -->
    <form @submit.prevent="submitRequest">
      <!-- 依頼ポイント -->
      <div class="form-group">
        <label for="request-points">依頼ポイント</label>
        <input id="request-points" v-model="requestPoints" placeholder="100" required>ポイント
      </div>
 
      <!-- 依頼名 -->
      <div class="form-group">
        <label for="request-name">依頼名</label>
        <input type="text" id="request-name" v-model="requestName" placeholder="依頼の名前を入力してください" required />
      </div>
 
      <!-- 募集人数 -->
      <div class="form-group">
        <label for="min-people">募集人数</label>
        <div class="flex">
          <select id="min-people" v-model="minPeople">
            <option v-for="num in 20" :key="'min-' + num" :value="num">{{ num }}</option>
          </select>
          ～ 
          <select id="max-people" v-model="maxPeople">
            <option v-for="num in 20" :key="'max-' + num" :value="num">{{ num }}</option>
          </select>
          人
        </div>
      </div>

      <!-- 活動日 -->
      <div class="form-group">
        <label for="activity-date">活動日</label>
        <input type="date" id="activity-date" v-model="activityDate" required />
      </div>

      <!-- 活動時間 -->
      <div class="form-group">
        <label for="activity-time">活動時間</label>
        <div class="flex">
          <select id="start-time" v-model="startTime">
            <option v-for="hour in hours" :key="'start-' + hour" :value="hour">{{ hour }}時</option>
          </select>
          ～ 
          <select id="end-time" v-model="endTime">
            <option v-for="hour in hours" :key="'end-' + hour" :value="hour">{{ hour }}時</option>
          </select>
        </div>
      </div>

      <!-- 活動場所 -->
      <div class="form-group">
        <label for="activity-location">活動場所</label>
        <div class="flex">
          <!-- 都道府県 -->
          <select id="prefecture" v-model="prefecture" required>
            <option value="" disabled selected>都道府県を選択</option>
            <option v-for="pref in prefectures" :key="pref" :value="pref">{{ pref }}</option>
          </select>

          <!-- 住所1 -->
          <input type="text" id="address1" v-model="address1" placeholder="市町村" required />

          <!-- 住所2 -->
          <input type="text" id="address2" v-model="address2" placeholder="住所2" />
        </div>
      </div>
      

      <!-- 実行も参加 -->
      <div class="form-group">
        <label class="inline-label">当日参加</label>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" value="可" v-model="Participation" />
            可
          </label>
          <label class="radio-label">
            <input type="radio" value="不可" v-model="Participation" />
            不可
          </label>
        </div>
      </div>


      <!-- 必要備品 -->
      <div class="form-group">
        <label class="inline-label">必要備品</label>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" value="有" v-model="equipmentNeeded" />
            有
          </label>
          <label class="radio-label">
            <input type="radio" value="無" v-model="equipmentNeeded" />
            無
          </label>
        </div>
      </div>

      <!-- 活動エリア -->
      <div class="form-group">
        <label>活動エリア</label>
        <div class="checkbox-group">
          <label class="checkbox-label"><input type="checkbox" v-model="activityAreas.road" /> 道路</label>
          <label class="checkbox-label"><input type="checkbox" v-model="activityAreas.mountain" /> 山</label>
          <label class="checkbox-label"><input type="checkbox" v-model="activityAreas.river" /> 川</label>
          <label class="checkbox-label"><input type="checkbox" v-model="activityAreas.sea" /> 海</label>
          <label class="checkbox-label"><input type="checkbox" v-model="activityAreas.park" /> 公園</label>
          <label class="checkbox-label"><input type="checkbox" v-model="activityAreas.other" /> その他</label>
        </div>
      </div>

      <!-- 活動テーマ -->
      <div class="form-group">
        <label>活動テーマ</label>
        <div class="flex3">
          <label class="checkbox-label"><input type="checkbox" v-model="activityTheme.regionalBeautification" />
            地域美化</label>
        </div>
      </div>

      <!-- 推奨年齢 -->
      <div class="form-group">
        <label>推奨年齢</label>
        <div class="checkbox-group">
          <label class="checkbox-label"><input type="checkbox" v-model="recommendedAge.all" /> 全年齢</label>
          <label class="checkbox-label"><input type="checkbox" v-model="recommendedAge.senior" /> シニア</label>
          <label class="checkbox-label"><input type="checkbox" v-model="recommendedAge.adult" /> 社会人</label>
          <label class="checkbox-label"><input type="checkbox" v-model="recommendedAge.student" /> 学生</label>
          <label class="checkbox-label"><input type="checkbox" v-model="recommendedAge.other" /> その他</label>
        </div>
      </div>

      <!-- 特徴 -->
      <div class="form-group">
        <label>特徴</label>
        <div class="checkbox-group">
          <label class="checkbox-label"><input type="checkbox" v-model="features.familyFriendly" /> 親子で参加できる</label>
          <label class="checkbox-label"><input type="checkbox" v-model="features.beginnerFriendly" /> 初心者歓迎</label>
          <label class="checkbox-label"><input type="checkbox" v-model="features.physical" /> 体力に自信がある</label>
        </div>
      </div>

      <!-- 依頼達成条件 -->
      <div class="form-group">
        <label for="request-condition">依頼達成条件</label>
        <textarea id="request-condition" v-model="requestCondition" placeholder="依頼を達成するための条件を記入してください"
          rows="4"></textarea>
      </div>

      <!-- エリア詳細（フリー入力） -->
      <div class="form-group">
        <label for="area-details">エリア詳細</label>
        <textarea id="area-details" v-model="areaDetails" placeholder="エリアに関する詳細情報を記入してください" rows="4"></textarea>
      </div>

      <!-- 基本情報（フリー入力） -->
      <div class="form-group">
        <label for="basic-info">基本情報</label>
        <textarea id="basic-info" v-model="basicInfo" placeholder="依頼の背景や基本情報を記入してください（例：活動目的や概要など）" rows="6"
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
        <textarea id="request-details" v-model="requestDetails" placeholder="依頼内容の詳細を記入してください" rows="4"></textarea>
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

  .flex1{
    width: 200px;
    display: flex;
  }
}

#request-points{
  width: 50px;
}
#area-details{
  width: 838px;
}
#basic-info{
  width: 838px;
}
#request-details{
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

.btn1{
  margin-top: 20px;
  width: 200px;
}

</style>
