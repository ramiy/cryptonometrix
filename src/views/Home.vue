<template>
  <h1><strong>Crypto</strong>nometrix</h1>

  <Card heading="Welcome">
    <img src="/assets/img/hero.png" />
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
    <div class="stocks-logos">
      <div v-for="stock in stocks" :key="`home-stocks-logos-${stock.id}`">
        <router-link :to="`/company/${stock.id}`">
          <img :src="`/assets/img/logos/${stock.img}`" /><br />
          <span>{{ stock.label }}</span>
        </router-link>
      </div>
    </div>
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
.stocks-logos {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  text-align: center;
}
.stocks-logos img {
  border: 1px solid #ccc;
  width: 100%;
  aspect-ratio: 1 / 1;
}
.stocks-logos span {
  border-bottom: 1px dotted currentColor;
}
@media screen and (max-width: 768px) {
  .stocks-logos {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
