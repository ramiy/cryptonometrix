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
      :labels="['Company', 'Month', 'Produced BTC', 'Notes']"
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
  inject: ["stocks", "filterResolution", "filterYear"],
  data() {
    return {
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
      return this.items
        .filter(
          (item) =>
            item.type === this.filterResolution.value &&
            item.year === this.filterYear.value
        )
        .map((item) => ({
          company: this.company.label,
          label: this.label(item),
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
    label(item) {
      let label = "";
      if (this.filterResolution.value === "monthly") {
        label = `${item.month}/${item.year}`;
      } else if (this.filterResolution.value === "quarterly") {
        label = `Q${item.quarter} / ${item.year}`;
      }
      return label;
    },
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
