<template>
  <h1>{{ company.label }}: BTC Production</h1>

  <Card heading="Monthly BTC Production Chart">
    <DataChart
      :id="`btc-production-${route}`"
      :labels="['Month', 'BTC Production']"
      :data="itemsForDisplay"
      :maxVal="maxVal"
    ></DataChart>
  </Card>

  <Card heading="Production Data">
    <DataTable
      :id="`btc-production-${route}`"
      :labels="labels"
      :data="itemsForDisplay"
    ></DataTable>
  </Card>

  <Card heading="Metric Description">
    <DataMetrics
      :id="`btc-production-${route}`"
      info="The number of bitcoins the company produced."
      :metrics="[
        { name: 'Company', description: company.name },
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
import DataTable from "@/components/data/DataTable.vue";
import DataMetrics from "@/components/data/DataMetrics.vue";
import btcProduction from "@/data/btc-production.js";

export default {
  name: "BTCProduction",
  components: {
    Card,
    DataChart,
    DataTable,
    DataMetrics,
  },
  inject: ["stocks"],
  data() {
    return {
      labels: ["Company", "Month", "Produced BTC", "Notes"],
      items: [],
    };
  },
  computed: {
    route() {
      return this.$route.params.company;
    },
    company() {
      return this.stocks.find((stock) => stock.id === this.route);
    },
    itemsForDisplay() {
      return this.items.map((item) => ({
        company: this.company.label,
        label: `${item.month}/${item.year}`,
        btc: item.btc,
        source: item.source,
      }));
    },
    maxVal() {
      return Math.max.apply(
        Math,
        this.items.map((item) => item.btc)
      );
    },
  },
  methods: {
    updateData() {
      const hasCompany = this.route ? true : false;
      const validCompany = this.stocks.some((stock) => stock.id === this.route);
      if (hasCompany && validCompany) {
        this.items = btcProduction.find(
          (item) => item.name === this.route
        ).stats;
      }
    },
  },
  created() {
    this.updateData();
  },
  watch: {
    $route() {
      this.updateData();
    },
  },
};
</script>
