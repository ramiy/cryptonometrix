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
        { name: 'Resolution', description: 'Monthly' },
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
  inject: ["stocks"],
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
        label: `${item.month}/${item.year}`,
        btc: item.btc,
        source: item.source,
      }));
    },
    hodlPositionItemsForDisplay() {
      return this.itemsHodlPosition.map((item) => ({
        company: this.company.label,
        label: `${item.month}/${item.year}`,
        btc: item.btc,
        source: item.source,
      }));
    },
    maxValProduction() {
      return Math.max.apply(
        Math,
        this.itemsProduction.map((item) => item.btc)
      );
    },
    maxValHodlPosition() {
      return Math.max.apply(
        Math,
        this.itemsHodlPosition.map((item) => item.btc)
      );
    },
  },
  methods: {
    updateProductionData() {
      const hasCompany = this.route ? true : false;
      const validCompany = this.stocks.some((stock) => stock.id === this.route);
      if (hasCompany && validCompany) {
        this.itemsProduction = btcProduction.find(
          (item) => item.name === this.route
        ).stats;
      }
    },
    updateHodlPositionData() {
      const hasCompany = this.route ? true : false;
      const validCompany = this.stocks.some((stock) => stock.id === this.route);
      if (hasCompany && validCompany) {
        this.itemsHodlPosition = btcHodlPosition.find(
          (item) => item.name === this.route
        ).stats;
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
