<script>
export default {
  name: "ExecutorMenu",
  methods: {
    cancelParticipation() {
      if (confirm("本当に依頼参加をキャンセルしますか？")) {
        alert("依頼参加をキャンセルしました");
        this.$router.push("/"); // ホームページへリダイレクト
      }
    },
  },
}
</script>

<template>
  <div class="menu-category">
    <h4>実行者</h4>
    <ul>
      <li>
        ・<button @click="cancelParticipation" class="cancel">依頼参加キャンセル</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.menu-category {
  margin-bottom: 15px;
}

.menu-category h4 {
  font-size: 1.1em;
  color: #ff8c00;
  margin-bottom: 10px;
  border-bottom: 2px solid #ff8c00;
  padding-bottom: 5px;
}

.menu-category ul {
  list-style-type: none;
  padding-left: 0;
}

.menu-category ul li {
  margin-bottom: 5px;
  color: #333;
  font-size: 0.9em;
}
.cancel{
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9em;
}

.cancel:hover {
  text-decoration: underline;
}

</style>
