<template>
  <h1><strong>Crypto</strong>nometrix</h1>

  <Card heading="Welcome">
    <img src="@/assets/hero.png" />
    <p>
      The capital market contains many blockchain-related stocks. These stocks
      allow investors to be exposed to the crypto industry without purchasing
      tokens or coins.
    </p>
    <p>
      The blockchain ecosystem is huge. Investors can invest in funds, ETFs,
      stocks and other financial instruments. This site focuses on publicly
      traded companies mining bitcoins, the bank of the future.
    </p>
    <p>
      Cryptonometrix is a data and intelligence provider that aggregates data to
      generate innovative metrics and tools for investors in the crypto mining
      sector.
    </p>
  </Card>

  <Card heading="Bitcoin Mining Stocks">
    <p>
      <strong>Stocks:</strong>
      <span
        v-for="stock in stocks"
        :key="`home-stocks-${stock.id}`"
        class="home-stock"
      >
        <router-link :to="`/company/${stock.id}`">
          {{ stock.label }}
        </router-link>
      </span>
    </p>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "Home",
  components: {
    Card,
  },
  inject: ["stocks"],
};
</script>

<style scoped>
.home-stock {
  display: inline-block;
  padding-inline-start: 0.75rem;
}
.home-stock a {
  border-bottom: 1px dotted currentColor;
}
.home-stock:not(:last-of-type):after {
  content: ",";
}
</style>
