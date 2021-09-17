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
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "Home",
  components: {
    Card,
  },
};
</script>
