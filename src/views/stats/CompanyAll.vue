<template>
  <h1>Companies</h1>

  <Card heading="Bitcoin Mining Stocks">
    <div class="stocks-logos">
      <div v-for="stock in stocks" :key="`home-stocks-logos-${stock.id}`">
        <router-link :to="`/company/${stock.id}`">
          <img
            :src="`/assets/img/logos/${stock.img}`"
            :alt="stock.name"
            loading="lazy"
          /><br />
          <span>{{ stock.label }}</span>
        </router-link>
      </div>
    </div>
  </Card>
</template>

<script>
import { inject } from "vue";
import Card from "@/components/Card.vue";

export default {
  name: "Company",
  components: {
    Card,
  },
  setup() {
    const stocks = inject("stocks", []);

    return {
      stocks,
    };
  },
};
</script>

<style>
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
