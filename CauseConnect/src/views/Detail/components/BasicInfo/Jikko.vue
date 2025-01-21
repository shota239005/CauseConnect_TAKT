<script setup>
import { defineEmits, defineProps, onMounted } from 'vue';
import apiClient from '@/axios';

// 親コンポーネントから受け取る case_id と user_id
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

// ポップアップが開いたときに userId と caseId をログ出力
onMounted(() => {
  console.log('%c[DEBUG] Jikko.vue 受け取った user_id:', 'color: green; font-weight: bold;', props.userId);
  console.log('%c[DEBUG] Jikko.vue 受け取った case_id:', 'color: green; font-weight: bold;', props.caseId);
});

// 親コンポーネントへポップアップを閉じるイベントを送信
const emit = defineEmits(['close']);

// ポップアップを閉じる処理
const handleClose = () => {
  emit('close');
};

// 実行者として参加する処理
const handleConfirm = async () => {
  try {
    console.log('%c[DEBUG] 送信するuser_id:', 'color: green; font-weight: bold;', props.userId);
    console.log('%c[DEBUG] 送信するcase_id:', 'color: green; font-weight: bold;', props.caseId);

    const response = await apiClient.post('/act', {
      user_id: props.userId,
      case_id: props.caseId
    });

    console.log('%c[DEBUG] サーバーからのレスポンス:', 'color: blue; font-weight: bold;', response.data);

    alert(response.data.message);
    emit('close');
  } catch (error) {
    if (error.response && error.response.status === 409) {
      // 重複登録時のメッセージ
      alert('すでに実行者として参加しています。');
      console.warn('%c[WARNING] 重複エラー:', 'color: orange; font-weight: bold;', error.response.data);
    } else {
      console.error('%c[ERROR] 参加登録に失敗しました:', 'color: red; font-weight: bold;', error);
      alert('登録に失敗しました。');
    }  }
};
</script>

<template>
  <div class="overlay" @click="handleClose">
    <div class="popup-content" @click.stop>
      <h2>実行者で参加しますか？</h2>
      <p>この依頼の実行者として参加します。</p>
      <div class="button-container">
        <button class="cancel-button" @click="handleClose">キャンセル</button>
        <button class="confirm-button" @click="handleConfirm">確定</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.cancel-button {
  padding: 10px 20px;
  background-color: #fff;
  border: 2px solid #d32f2f;
  color: #d32f2f;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #d32f2f;
  color: #fff;
}

.confirm-button {
  padding: 10px 20px;
  background-color: #0f61ba;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: #0d4d94;
}
</style>


