<script setup>
import { useRouter } from 'vue-router'

// 新規登録ページへ遷移するためのルーター設定
const router = useRouter()

// 新規登録ページに遷移するメソッド
const goToRegister = () => {
  router.push('/register')  // 新規登録ページに遷移
}
</script>

<template>
    <button class="btn1" @click="goToRegister">新 規 登 録 は こ ち ら</button>
</template>


<style scoped>
.btn1{
  width: 100%;
  color: #333;
}
</style>
