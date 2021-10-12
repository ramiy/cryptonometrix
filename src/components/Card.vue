<template>
  <article class="card">
    <div class="card-heading" v-if="heading">
      <span>{{ heading }}</span>
      <img
        src="/assets/img/logo.png"
        alt="Cryptonometrix Logo"
        loading="eager"
        v-if="brand"
      />
    </div>
    <div class="card-subheading" v-if="subheading">{{ subheading }}</div>
    <div class="card-content"><slot></slot></div>
  </article>
</template>

<script>
export default {
  name: "Card",
  props: {
    heading: String,
    subheading: String,
    brand: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
article.card {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px;
}
article.card .card-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}
article.card .card-heading img {
  height: 25px;
}
article.card .card-subheading {
  padding: 20px;
  border-bottom: 1px solid #ddd;
  background-color: #f6f6f6;
  font-weight: bold;
}
article.card .card-content {
  padding: 20px;
}
article.card .card-content p:last-of-type {
  margin-bottom: 0;
}
</style>