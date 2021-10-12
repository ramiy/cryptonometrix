<template>
  <h1>BTC Production</h1>

  <Card heading="BTC Production Chart">
    <DataComparisonChart
      id="btc-production-all-chart"
      link="btc-production"
      :labels="['Period', 'Production (BTC)']"
      :data="itemsForDisplay"
      :maxVal="maxVal"
    ></DataComparisonChart>
  </Card>

  <Card heading="Metric Description">
    <DataMetrics
      id="btc-production-all-description"
      info="The number of bitcoins each company produced."
      :metrics="[
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
import DataComparisonChart from "@/components/data/DataComparisonChart.vue";
import DataMetrics from "@/components/data/DataMetrics.vue";
import btcProduction from "@/data/btc-production.js";

export default {
  name: "BTCProductionAll",
  components: {
    Card,
    DataComparisonChart,
    DataMetrics,
  },
  inject: ["filterResolution"],
  data() {
    return {
      items: [],
    };
  },
  computed: {
    itemsForDisplay() {
      return this.items.map((item) => {
        return {
          name: item.name,
          stats: item.stats.filter(
            (stat) => stat.type === this.filterResolution.value
          ),
        };
      });
    },
    maxVal() {
      return Math.max(
        ...btcProduction.map((item) =>
          Math.max(
            ...item.stats
              .filter((stat) => stat.type === this.filterResolution.value)
              .map((stats) => stats.btc)
          )
        )
      );
    },
  },
  created() {
    this.items = btcProduction;
  },
};
</script>
