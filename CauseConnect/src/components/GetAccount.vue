<script>
import { ref, reactive, onMounted } from 'vue';
import apiClient from '@/axios'; // axiosインスタンスのインポート

export default {
  name: 'AccountInfo',
  setup() {
    // ユーザーデータ
    const user = reactive({
      nickname: '', // 初期値
    });

    const isGuest = ref(true); // ゲストフラグ
    const message = ref(''); // エラーメッセージ表示用

    // ユーザーデータの取得
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        message.value = 'ようこそゲストさま';
        return;
      }

      try {
        const response = await apiClient.get('/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { data } = response;
        Object.assign(user, data);
        isGuest.value = false; // ゲストではないことを設定
      } catch (error) {
        console.error('ユーザーデータの取得に失敗しました:', error);
        message.value = 'ユーザー情報の取得に失敗しました。';
      }
    };

    // コンポーネントがマウントされたらユーザーデータを取得
    onMounted(fetchUserData);

    return {
      user,
      isGuest,
      message,
    };
  },
};
</script>

<template>
  <div class="account-info">
    <p v-if="message">{{ message }}</p>
    <p v-else>
      ようこそ{{ isGuest ? 'ゲスト' : ' ' + user.nickname }}さま
    </p>
  </div>
</template>

<style scoped>
.account-info {
  font-size: 18px;
  text-align: center;
}
</style>
