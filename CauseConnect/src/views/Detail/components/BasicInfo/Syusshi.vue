<script setup>
import { defineEmits, defineProps, ref, onMounted } from 'vue';
import apiClient from '@/axios';

// 親コンポーネントから受け取る userId と caseId
const props = defineProps({
  userId: {
    type: Number,
    required: true
  },
  caseId: {
    type: Number,
    required: true
  }
});

// 親コンポーネントへcloseイベントを送る
const emit = defineEmits(['close']);

// 入力されたポイントを格納する変数（初期値100）
const points = ref('5000');

// 現在の保有ポイント（合計値を表示）
const currentPoints = ref(0);

// 二重送信防止用のフラグ
const isSubmitting = ref(false);

// 閉じるボタンのクリック処理
const handleClose = () => {
  emit('close');
};

// 確定ボタンのクリック処理
const handleConfirm = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  if (parseInt(points.value) >= 100) {
    try {
      console.log('%c[DEBUG] 出資送信 - user_id:', 'color: green; font-weight: bold;', props.userId);
      console.log('%c[DEBUG] 出資送信 - case_id:', 'color: green; font-weight: bold;', props.caseId);
      console.log('%c[DEBUG] 出資送信 - points:', 'color: green; font-weight: bold;', points.value);

      // 出資登録のAPIリクエスト（存在する場合は更新、なければ新規作成）
      const response = await apiClient.post('/sup/update-or-create', {  // ✅ /apiは含めない
        user_id: props.userId,
        case_id: props.caseId,
        sup_point: parseInt(points.value)
      });

      console.log('%c[DEBUG] サーバーからのレスポンス:', 'color: blue; font-weight: bold;', response.data);
      alert(response.data.message);
      emit('close');
    } catch (error) {
      console.error('%c[ERROR] 出資登録に失敗しました:', 'color: red; font-weight: bold;', error);
      alert('出資登録に失敗しました。');
    }
  } else {
    alert('100ポイント以上で参加できます。');
  }
  isSubmitting.value = false;
};

// コンポーネントがマウントされたときに保有ポイントを取得
onMounted(() => {
  apiClient.get('/points/history', {  // ✅ /apiは含めない
    params: { user_id: props.userId }
  })
  .then(response => {
    currentPoints.value = response.data.current_points;
    console.log('%c[DEBUG] 保有ポイント:', 'color: purple; font-weight: bold;', currentPoints.value);
  })
  .catch(error => {
    console.error('ポイントの取得に失敗しました:', error);
  });
});
</script>

<template>
  <!-- 半透明の背景 -->
  <div class="overlay" @click="handleClose">
    <!-- ポップアップコンテンツ -->
    <div class="jikko-popup" @click.stop>
      <h1>"出資者で参加する"には、１００ポイント以上から参加できます。</h1>

      <!-- 保有ポイントの表示 -->
      <p>保有ポイント：{{ currentPoints }}ポイント</p>

      <!-- ポイント入力フォーム -->
      <form>
        <label for="points">ポイント：</label>
        <input type="number" id="points" v-model="points" placeholder="ポイントを入力" />
      </form>

      <div class="button-container">
        <button class="close-button" @click="handleClose">キャンセル</button>
        <button class="syusshi" @click="handleConfirm">確定</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 半透明の背景 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ポップアップコンテンツ */
.jikko-popup {
  background-color: white;
  border: 2px solid #0f61ba;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
  max-width: 600px;
  width: 90%;
}

h1 {
  font-size: 20px;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.close-button, .syusshi {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.close-button {
  background-color: white;
  border: 2px solid #d32f2f;
  color: red;
}

.syusshi {
  background-color: #0f61ba;
  color: white;
  padding: 20px 40px;
}
</style>
