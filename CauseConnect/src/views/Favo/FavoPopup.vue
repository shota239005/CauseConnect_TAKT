<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>


<template>
  <div class="total">
    <div class="title">
      <h1>お気に入り一覧</h1>
    </div>

    <div class="contents">
      地域清掃
      浜辺清掃
    </div>
  </div>
</template>

<style>
.total{
  text-align: center;
}
</style>
