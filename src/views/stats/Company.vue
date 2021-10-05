<template>
  <h1>{{ company.label }}</h1>

  <Card heading="Monthly BTC Production Chart">
    <DataChart
      :id="`btc-production-${route}`"
      :labels="['Month', 'BTC Production']"
      :data="productionItemsForDisplay"
      :maxVal="maxValProduction"
    ></DataChart>
  </Card>

  <Card heading="Monthly BTC HODL Position">
    <DataChart
      :id="`btc-hodl-position-${route}`"
      :labels="['Month', 'BTC HODL Position']"
      :data="hodlPositionItemsForDisplay"
      :maxVal="maxValHodlPosition"
    ></DataChart>
  </Card>

  <Card heading="Metric Description">
    <DataMetrics
      :id="`btc-production-${route}`"
      info="Information about the company."
      :metrics="[
        { name: 'Company', description: company.name },
        { name: 'Website', description: company.website },
        { name: 'Asset', description: 'Bitcoin' },
        {
          name: 'Resolution',
          description: filterResolution.value,
          class: 'capitalize',
        },
      ]"
    >
    </DataMetrics>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import DataChart from "@/components/data/DataChart.vue";
import DataMetrics from "@/components/data/DataMetrics.vue";
import btcProduction from "@/data/btc-production.js";
import btcHodlPosition from "@/data/btc-hodl-position.js";

export default {
  name: "Company",
  components: {
    Card,
    DataChart,
    DataMetrics,
  },
  inject: ["stocks", "filterResolution"],
  data() {
    return {
      itemsProduction: [],
      itemsHodlPosition: [],
    };
  },
  computed: {
    route() {
      return this.$route.params.company;
    },
    company() {
      return this.stocks.find((stock) => stock.id === this.route);
    },
    productionItemsForDisplay() {
      return this.itemsProduction.map((item) => ({
        company: this.company.label,
        label: this.label(item),
        btc: item.btc,
      }));
    },
    hodlPositionItemsForDisplay() {
      return this.itemsHodlPosition.map((item) => ({
        company: this.company.label,
        label: this.label(item),
        btc: item.btc,
      }));
    },
    maxValProduction() {
      return Math.max(...this.itemsProduction.map((item) => item.btc));
    },
    maxValHodlPosition() {
      return Math.max(...this.itemsHodlPosition.map((item) => item.btc));
    },
  },
  methods: {
    label(item) {
      let label = "";
      if (this.filterResolution.value === "monthly") {
        label = `${item.month}/${item.year}`;
      } else if (this.filterResolution.value === "quarterly") {
        label = `Q${item.quarter} / ${item.year}`;
      }
      return label;
    },
    updateProductionData() {
      const hasCompany = this.route ? true : false;
      const validCompany = this.stocks.some((stock) => stock.id === this.route);
      if (hasCompany && validCompany) {
        this.itemsProduction = btcProduction
          .find((item) => item.name === this.route)
          .stats.filter((item) => item.type === this.filterResolution.value);
      }
    },
    updateHodlPositionData() {
      const hasCompany = this.route ? true : false;
      const validCompany = this.stocks.some((stock) => stock.id === this.route);
      if (hasCompany && validCompany) {
        this.itemsHodlPosition = btcHodlPosition
          .find((item) => item.name === this.route)
          .stats.filter((item) => item.type === this.filterResolution.value);
      }
    },
  },
  created() {
    this.updateProductionData();
    this.updateHodlPositionData();
  },
  watch: {
    $route() {
      this.updateProductionData();
      this.updateHodlPositionData();
    },
  },
};
</script>
